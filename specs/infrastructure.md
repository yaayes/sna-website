# Infrastructure & Deployment Guide

## Table of Contents

1. [Overview](#overview)
2. [Repository Structure](#repository-structure)
3. [Provisioning a New Server with Ansible](#provisioning-a-new-server-with-ansible)
4. [Auto Deployment via GitHub Actions](#auto-deployment-via-github-actions)
5. [Manual Deployment](#manual-deployment)
6. [SSL Certificate Renewal](#ssl-certificate-renewal)
7. [Environments](#environments)

---

## Overview

| Layer | Technology |
|---|---|
| Web server | Nginx (with HTTP→HTTPS redirect, HSTS, OCSP stapling) |
| PHP | PHP 8.4-FPM + OPcache |
| Database | PostgreSQL 16 |
| Cache / Sessions | Redis 7 |
| Queue workers | Supervisor (2 × `queue:work` processes) |
| SSL | Let's Encrypt via Certbot (auto-renewed weekly) |
| Firewall | UFW — ports 22, 80, 443 only |
| CI/CD | GitHub Actions |

---

## Repository Structure

```
ansible/
├── inventory.ini                  # Server inventory (staging / prod)
├── playbook.yml                   # Main playbook entry point
├── vars.yml                       # Default variables (override per-host)
└── roles/server/
    ├── tasks/main.yml             # All provisioning tasks
    ├── handlers/main.yml          # Service restart/reload handlers
    ├── files/                     # deploy_key + deploy_key.pub (NOT committed)
    │   └── README.md              # Instructions for generating the deploy key
    └── templates/
        ├── nginx-http.conf.j2     # HTTP-only config (used during certbot challenge)
        ├── nginx-https.conf.j2    # Final HTTPS config with TLS hardening
        ├── php-fpm-pool.conf.j2   # PHP-FPM pool config
        ├── opcache.ini.j2         # OPcache tuning
        ├── redis.conf.j2          # Redis config
        └── supervisor-worker.conf.j2  # Laravel queue worker

.github/workflows/
├── deploy-staging.yml             # Auto-deploy on push to main → staging
└── deploy-prod.yml                # Deploy to prod on release (currently inactive)

scripts/
└── deploy.sh                      # Reusable deploy script run over SSH by CI
```

---

## Provisioning a New Server with Ansible

### Prerequisites

Install Ansible on your local machine:

```bash
pip install ansible
```

### Step 1 — Generate a deploy key

This key will be placed on the server and added to the GitHub repo as a deploy key (read-only).

```bash
ssh-keygen -t ed25519 \
  -f ansible/roles/server/files/deploy_key \
  -N "" \
  -C "deploy@sna-prod"
```

Then add `ansible/roles/server/files/deploy_key.pub` as a deploy key in:
**https://github.com/yaayes/sna-website/settings/keys/new**

> These files are git-ignored and must never be committed.

### Step 2 — Configure the inventory

Edit `ansible/inventory.ini` and replace the placeholder IPs:

```ini
[staging]
staging ansible_host=178.104.51.228 ansible_user=forge

[prod]
prod ansible_host=YOUR_PROD_IP ansible_user=forge
```

### Step 3 — Configure variables

Edit `ansible/vars.yml` (or create a per-host override at `ansible/host_vars/<hostname>/vars.yml`):

```yaml
php_version: "8.4"
node_version: "22"
postgresql_version: "16"

app_name: "sna"
app_domain: "sna.inmindweb.fr"
app_user: "forge"
app_path: "/home/forge/{{ app_domain }}"
repo_url: "git@github.com:yaayes/sna-website.git"
repo_branch: "main"

certbot_email: "notification@inmindweb.fr"

db_name: "sna_db"
db_user: "forge"
db_password: "CHANGE_ME"      # ← set a strong password

redis_password: ""             # ← set if Redis auth is required
```

> **Never commit real passwords.** Use Ansible Vault to encrypt sensitive values:
> ```bash
> ansible-vault encrypt_string 'your_password' --name 'db_password'
> ```

### Step 4 — Ensure SSH access

The playbook connects as `forge` using your local SSH key. Make sure `~/.ssh/id_rsa` (or the key configured in `inventory.ini`) is authorised on the target server.

If provisioning a brand-new server, first copy your key:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub forge@YOUR_SERVER_IP
```

### Step 5 — Run the playbook

**Target staging:**

```bash
cd ansible
ansible-playbook playbook.yml -i inventory.ini -l staging
```

**Target prod:**

```bash
cd ansible
ansible-playbook playbook.yml -i inventory.ini -l prod
```

**Dry-run (check mode — no changes applied):**

```bash
ansible-playbook playbook.yml -i inventory.ini -l staging --check
```

**Run only specific tags** (once the playbook is fully tagged — future improvement):

```bash
ansible-playbook playbook.yml -i inventory.ini -l staging --tags nginx
```

### What the playbook installs

1. Base packages + UFW firewall (22/80/443)
2. PHP 8.4 + FPM + all required extensions + OPcache
3. Composer (latest)
4. Node.js 22 (via NodeSource)
5. PostgreSQL 16 — creates `sna_db` database and `forge` user
6. Redis — localhost-only, 256 MB max memory
7. Nginx — deploys HTTP config, then HTTPS after cert is issued
8. Let's Encrypt certificate via Certbot webroot method
9. Weekly certbot renewal cron (every Monday at 03:00 UTC)
10. Supervisor with 2 Laravel queue worker processes
11. Sudoers rule so `forge` can reload PHP-FPM without a password

> ⚠️ The `openssl dhparam` step (generates `/etc/nginx/dhparams.pem`) takes **3–5 minutes** on first run.

---

## Auto Deployment via GitHub Actions

### How it works

| Event | Workflow | Target |
|---|---|---|
| Push to `main` | `deploy-staging.yml` | Staging server |
| Manual dispatch / Release (when activated) | `deploy-prod.yml` | Production server |

The workflow SSHs into the server and runs `scripts/deploy.sh` which:
1. `git pull origin main`
2. `composer install --no-dev --optimize-autoloader`
3. `php artisan migrate --force`
4. `php artisan config:cache && route:cache && view:cache && event:cache`
5. `npm ci && npm run build`
6. `php artisan queue:restart`
7. `sudo systemctl reload php8.4-fpm`

### Required GitHub Secrets

Create a **`staging`** environment at:
**https://github.com/yaayes/sna-website/settings/environments**

Add these secrets:

| Secret | Value |
|---|---|
| `STAGING_HOST` | `178.104.51.228` |
| `STAGING_USER` | `forge` |
| `STAGING_APP_PATH` | `/home/forge/sna.inmindweb.fr` |
| `STAGING_SSH_KEY` | Contents of `~/.ssh/sna_deploy` on the server |

For **production** (when ready), create a `production` environment and add:

| Secret | Value |
|---|---|
| `PROD_HOST` | Production server IP |
| `PROD_USER` | `forge` |
| `PROD_APP_PATH` | `/home/forge/sna.inmindweb.fr` |
| `PROD_SSH_KEY` | Private deploy key for the prod server |

### Activating production deployments

When the project is ready for production, open `.github/workflows/deploy-prod.yml` and uncomment the `release` trigger:

```yaml
on:
  release:
    types: [published]
```

Then create a GitHub Release to trigger a production deploy.

---

## Manual Deployment

SSH into the server and run the deploy script directly:

```bash
ssh forge@178.104.51.228
APP_PATH=/home/forge/sna.inmindweb.fr bash /home/forge/sna.inmindweb.fr/scripts/deploy.sh
```

---

## SSL Certificate Renewal

Certbot renewal runs automatically via cron every **Monday at 03:00 UTC**:

```
0 3 * * 1  certbot renew --quiet --deploy-hook 'systemctl reload nginx'
```

To manually force a renewal:

```bash
ssh forge@178.104.51.228
sudo certbot renew --force-renewal --deploy-hook 'systemctl reload nginx'
```

To check certificate expiry:

```bash
ssh forge@178.104.51.228 'sudo certbot certificates'
```

---

## Environments

| Environment | URL | Branch | Deploy trigger |
|---|---|---|---|
| Staging | https://sna.inmindweb.fr | `main` | Push to `main` |
| Production | TBD | `main` (at release) | GitHub Release (inactive) |
