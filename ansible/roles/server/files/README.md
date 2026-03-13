# ansible/roles/server/files/

Place two files here before running the playbook:

- `deploy_key` — private SSH key (ed25519) that has read access to the GitHub repo
- `deploy_key.pub` — corresponding public key (add this as a Deploy Key in GitHub repo settings)

These files are intentionally not committed. Generate with:

    ssh-keygen -t ed25519 -f ansible/roles/server/files/deploy_key -N "" -C "deploy@sna-prod"

Then add `deploy_key.pub` to https://github.com/yaayes/sna-website/settings/keys/new
