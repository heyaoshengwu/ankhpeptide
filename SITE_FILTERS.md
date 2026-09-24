# Source filter for ankhpeptide.com

- GitHub repo: `heyaoshengwu/ankhpeptide`
- Source: `root@139.180.223.181:/opt/apeptide`
- Synced at: 2026-09-25T01:10:22+08:00
- Is raw-material site: **yes**

## Common excludes (all sites)
```
.git/ node_modules/ .next/ dist/ dist.bak.*/
__pycache__/ venv/ .venv/ *.pyc
*.log *.sqlite* *.db *.db-shm *.db-wal
.env .env.local .env.*.local .env.production .env.development ...
.DS_Store Thumbs.db
*.key *.pem *.p12 *.pfx id_rsa* id_dsa* id_ecdsa* id_ed25519*
*.keystore *.jks service-account*.json *-credentials.json
secrets.yaml secrets.yml .secrets/ uploads/ *.tar.gz *.zip *.bak
```

## Raw-material site extras

- `products/`, `products*.json`, `products*.ts`
- `product-search*`, `product-card*`, `product-filters*`, `product-list*`, `product-detail*`
- `seed-*.mjs`, `seed-*.js`, `seed-products*`
- `prisma/` (DB schema 通常含 product 表)

## Site-specific

