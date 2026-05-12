# Guide de Configuration Queue Redis et Laravel Horizon

Ce guide couvre la configuration et le déploiement de Laravel Horizon avec Redis pour gérer les files d'attente de l'application SNA.

## Vue d'ensemble

Laravel Horizon offre un tableau de bord pour monitorer les travaux en queue. Les notifications de soumission de formulaires sont enqueued et traitées de manière asynchrone via Horizon et Redis.

## Configuration Locale (Développement)

### Prérequis
- Docker Compose avec service Redis configuré
- PHP 8.5+
- Laravel 12

### Variables d'environnement

Ajouter dans `.env` (fichier local) :

```env
QUEUE_CONNECTION=redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=null
REDIS_DB=0
REDIS_CACHE_DB=1
```

**Note:** En développement avec Docker Compose, l'hôte Redis est typiquement `redis` (nom du service).

### Démarrage local

1. Assurez-vous que le conteneur Redis est en cours d'exécution :
   ```bash
   docker compose up -d redis
   ```

2. Lancez Horizon dans une fenêtre de terminal dédiée :
   ```bash
   php artisan horizon
   ```

3. Accédez au tableau de bord Horizon :
   ```
   http://localhost:8000/horizon
   ```

4. Testez la connexion Redis :
   ```bash
   php artisan tinker
   >>> Redis::ping()
   => "PONG"
   ```

### Arrêt gracieux en développement

Pour arrêter Horizon proprement (traiter les travaux en cours avant de quitter) :
```bash
php artisan horizon:terminate
```

Ou via le tableau de bord Horizon, cliquez sur "Terminate" (en haut à droite).

---

## Configuration Serveur (Production)

### Prérequis
- Serveur de production avec Docker
- Redis en conteneur ou service système
- Accès administrateur pour configurer systemd

### Installation manuelle Redis (style Laravel Forge, local-only)

Cette approche installe Redis en service système, avec écoute uniquement en local (`127.0.0.1` et `::1`).

1. Installer Redis :
   ```bash
   sudo apt update
   sudo apt install -y redis-server
   ```

2. Sauvegarder la configuration d'origine :
   ```bash
   sudo cp /etc/redis/redis.conf /etc/redis/redis.conf.bak
   ```

3. Éditer `/etc/redis/redis.conf` et définir au minimum :
   ```conf
   bind 127.0.0.1 ::1
   protected-mode yes
   port 6379
   daemonize no
   supervised systemd
   ```

4. (Optionnel recommandé) Ajouter un mot de passe Redis :
   ```conf
   requirepass CHANGE_ME_WITH_A_STRONG_SECRET
   ```

5. Activer et démarrer le service :
   ```bash
   sudo systemctl enable redis-server
   sudo systemctl restart redis-server
   sudo systemctl status redis-server
   ```

6. Vérifier que Redis n'écoute qu'en local :
   ```bash
   sudo ss -lntp | grep 6379
   ```

   Résultat attendu : uniquement `127.0.0.1:6379` et/ou `[::1]:6379`.

7. (Défense en profondeur) Bloquer explicitement 6379 au firewall :
   ```bash
   sudo ufw deny 6379/tcp
   ```

### Intégration Ansible (équivalent automatique)

Le playbook provisionne déjà Redis via le rôle serveur :
- installation du package `redis-server`
- déploiement de `/etc/redis/redis.conf` depuis [ansible/roles/server/templates/redis.conf.j2](ansible/roles/server/templates/redis.conf.j2)
- activation et démarrage de `redis-server`

Variables Redis à surcharger si nécessaire dans [ansible/host_vars/prod/vars.yml](ansible/host_vars/prod/vars.yml) ou [ansible/vars.yml](ansible/vars.yml) :
- `redis_bind_addresses` (par défaut `127.0.0.1` + `::1`)
- `redis_port` (par défaut `6379`)
- `redis_maxmemory`
- `redis_maxmemory_policy`

Pour appliquer sur le serveur :
```bash
cd ansible
ansible-playbook -i inventory.ini playbook.yml -e target=prod --ask-vault-pass
```

### Variables d'environnement serveur

Sur le serveur, ajouter dans `.env` (ou secrets orchestrés) :

```env
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1      # Redis local au serveur
REDIS_PORT=6379
REDIS_PASSWORD=YOUR_STRONG_PASSWORD_HERE
REDIS_DB=0
REDIS_CACHE_DB=1
```

**Recommandation :** En production, utilisez une passprase Redis forte et stockez-la dans un gestionnaire de secrets (ex: HashiCorp Vault, AWS Secrets Manager, ou Docker secrets si orchestration Swarm).

### Configuration Horizon pour production

Modifier `config/horizon.php` (créé par `php artisan horizon:install`) :

```php
'production' => env('APP_ENV') === 'production',

'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue' => ['default'],
            'balance' => 'simple',
            'minProcesses' => 1,
            'maxProcesses' => env('HORIZON_PROCESSES', 4),
            'minRestarts' => 1,
            'restartAfter' => 3600,
            'timeout' => 60,
            'sleep' => 3,
        ],
    ],
],
```

**Adaptation possible selon charge :**
- Format faible : `minProcesses: 1, maxProcesses: 2`
- Format moyen : `minProcesses: 2, maxProcesses: 8`
- Format élevé : `minProcesses: 4, maxProcesses: 16`

### Systemd Service (Linux)

Créer un fichier `/etc/systemd/system/horizon.service` :

```ini
[Unit]
Description=Laravel Horizon Worker
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/html
ExecStart=/usr/bin/php /var/www/html/artisan horizon
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

**Note pour Docker :** Si l'app tourne en conteneur Docker, le service systemd démarre plutôt un conteneur docker run ou utilise docker-compose.

### Démarrage et vérification en production

Lancer Horizon :
```bash
sudo systemctl start horizon
sudo systemctl enable horizon           # auto-start au reboot
sudo systemctl status horizon           # vérifier état
```

Vérifier le statut via la CLI :
```bash
php artisan horizon:status
```

Affiche :
- État de chaque processus Horizon
- Nombre de travaux traités
- Charge mémoire

Tester la connexion Redis depuis l'app :
```bash
php artisan tinker
>>> Redis::ping()
=> "PONG"

>>> Cache::get('test_key')  # vérifie aussi la chaîne complète
```

### Logs

Les logs Horizon se trouvent dans `/storage/logs/laravel.log` ou via systemd :
```bash
sudo journalctl -u horizon -f          # suivi live
sudo journalctl -u horizon --since today
```

---

## Déploiement avec Graceful Shutdown

Lors du déploiement (mise à jour de code), il est important d'arrêter les workers Horizon proprement avant de redémarrer l'app :

### Dans le script de déploiement (`scripts/deploy.sh`)

```bash
# Avant le redémarrage / mise à jour de l'app
php artisan horizon:terminate

# Attendre termination gracieuse (~10 secondes max)
sleep 10

# Relancer Horizon sur la nouvelle version
php artisan horizon
```

Cela garantit que :
1. Les jobs en cours sont traités jusqu'à completion
2. Aucun travail n'est pris en charge lors du shutdown
3. Horizon redémarre avec la dernière version du code

---

## Monitoring et Maintenance

### Tableau de Bord Horizon

Accessible via `/horizon` (authentification requise).

Parmi les fonctionnalités :
- **Workloads :** Statistiques en temps réel des travaux
- **Processes :** État des processus supervisés
- **Failed Jobs :** Travaux échoués + traces d'erreur
- **Metrics :** Historique sur 7 jours

### Commandes utiles

```bash
# Status global
php artisan horizon:status

# Terminer proprement tous les workers
php artisan horizon:terminate

# Continuer après une pause
php artisan horizon

# Redémarrer les workers
php artisan horizon:restart

# Purger les jobs échoués anciens
php artisan horizon:purge

# Afficher les jobs en attente
php artisan queue:work redis --verbose
```

### Alertes recommandées

En production, configurer des alertes pour :
- Nombre de jobs échoués > seuil
- Mémoire Horizon > 500 MB
- Queue time (latence) > 5 minutes
- Absence de renouvellement d'un worker pendant > 1 heure

---

## Troubleshooting

### Redis non accessible

**Symptôme :** `ERRCONNREFUSED` ou `Could not connect to Redis`

**Vérifications :**
```bash
# 1. Redis conteneur en cours d'exécution ?
docker compose ps redis

# 2. Redis écoute sur le bon port ?
docker compose exec redis redis-cli ping
# Attendu: "PONG"

# 3. Credentials Redis correctes ?
echo $REDIS_PASSWORD    # vérifier .env
```

### Horizon tourne mais ne traite pas les jobs

**Symptôme :** Queue grandit, aucun job traité

**Vérifications :**
```bash
# 1. Processus actif ?
php artisan horizon:status

# 2. Queue assignée correctement ?
php artisan queue:work redis --verbose    # debug mode

# 3. Jobs n'ont pas d'erreur ?
php artisan tinker
>>> DB::table('jobs')->count()
>>> DB::table('failed_jobs')->count()
```

### Mémoire consommée par Horizon croissante

**Cause probable :** Job infini ou fuite mémoire

**Action :**
1. Vérifier les logs Horizon : `journalctl -u horizon -f`
2. Identifier le job problématique dans le tableau de bord `/horizon`
3. Réduire `maxProcesses` temporairement
4. Redémarrer Horizon une fois le code corrigé

---

## Ressources supplémentaires

- [Documentation Laravel Horizon officielle](https://laravel.com/docs/12/horizon)
- [Configuration Redis Laravel](https://laravel.com/docs/12/redis)
- [Queues dans Laravel 12](https://laravel.com/docs/12/queues)
