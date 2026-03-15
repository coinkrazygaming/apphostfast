# Deployment Guide

Complete guide for deploying AppHostFast to production.

## Table of Contents

1. [Local Development](#local-development)
2. [Railway (Recommended)](#railway-recommended)
3. [Fly.io](#flyio)
4. [Render.com](#rendercom)
5. [VPS (Self-Hosted)](#vps-self-hosted)
6. [Custom Domain Setup](#custom-domain-setup)
7. [SSL Certificate Management](#ssl-certificate-management)
8. [Database & Environment Setup](#database--environment-setup)

---

## Local Development

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/yourusername/apphostfast.git
cd apphostfast

# Copy environment file
cp .env.example .env.local

# Start services (requires Docker & Docker Compose)
docker-compose up

# Access the app
open http://localhost:3000
```

### Without Docker

```bash
# Install dependencies
pnpm install

# Start PostgreSQL and Redis manually
# macOS with Homebrew:
brew services start postgresql@15
brew services start redis

# Install and run:
pnpm dev

# Database is available at: postgresql://localhost:5432/apphostfast
# Redis is available at: redis://localhost:6379
```

---

## Railway (Recommended)

Railway is the simplest way to deploy AppHostFast with automatic PostgreSQL and Redis.

### Method 1: One-Click Deploy (Fastest)

1. Click the Railway deploy button (in README.md)
2. Connect your GitHub account
3. Configure environment variables:
   - `GITHUB_CLIENT_ID` - From GitHub OAuth app
   - `GITHUB_CLIENT_SECRET` - From GitHub OAuth app
   - `JWT_SECRET` - Generate random 32+ character string
4. Click Deploy
5. Wait 5-10 minutes for deployment

### Method 2: Manual Deploy

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Set environment variables
railway variables set GITHUB_CLIENT_ID=your_id
railway variables set GITHUB_CLIENT_SECRET=your_secret
railway variables set JWT_SECRET=your_jwt_secret

# Deploy
railway up

# View logs
railway logs

# Get deployment URL
railway domains list
```

### Method 3: Connect GitHub (Auto-Deploy)

1. Push your code to GitHub
2. Go to [railway.app/dashboard](https://railway.app/dashboard)
3. Click "New Project"
4. Select "GitHub Repo"
5. Connect your repo
6. Railway auto-deploys on every push

### Railway Environment Variables

```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/apphostfast
REDIS_URL=redis://user:pass@host:6379
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
JWT_SECRET=your_jwt_secret_min_32_chars
```

---

## Fly.io

Fly.io provides global deployment across multiple regions.

### Setup

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Create app
flyctl apps create apphostfast

# Set secrets (sensitive variables)
flyctl secrets set GITHUB_CLIENT_ID=your_id
flyctl secrets set GITHUB_CLIENT_SECRET=your_secret
flyctl secrets set JWT_SECRET=your_jwt_secret
flyctl secrets set DATABASE_URL=postgresql://...
flyctl secrets set REDIS_URL=redis://...

# Deploy
flyctl deploy

# Monitor deployment
flyctl logs

# Get deployment URL
flyctl apps info apphostfast
```

### Scaling

```bash
# Scale to multiple regions
flyctl regions add sfo ord lhr

# Check status
flyctl regions list

# Scale up machines
flyctl scale count 2
```

### Rolling Back

```bash
# View deployment history
flyctl history

# Rollback to previous version
flyctl releases list
flyctl releases rollback [RELEASE_ID]
```

---

## Render.com

Render offers PostgreSQL and Redis hosting included.

### Automatic Deploy from GitHub

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select `render.yaml` as config file
5. Set environment variables
6. Click Deploy

### Manual Deploy

```bash
# Install Render CLI (if available)
npm install -g @render/cli

# Authenticate
render auth

# Deploy
render deploy
```

### Environment Variables in Render

Set in Render dashboard:
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `JWT_SECRET`
- Database URL (auto-generated from add-on)
- Redis URL (auto-generated from add-on)

---

## VPS (Self-Hosted)

Deploy to any VPS provider: DigitalOcean, Hetzner, Linode, AWS, etc.

### Prerequisites

- VPS with Ubuntu 22.04 LTS (or similar)
- Minimum: 2GB RAM, 1 vCPU, 30GB disk
- SSH access to root or sudo user
- Domain name (for SSL)

### Full Installation Script

```bash
#!/bin/bash

# 1. SSH into your VPS
ssh root@your_vps_ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 4. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 5. Install Git
apt install -y git

# 6. Clone AppHostFast
cd /opt
git clone https://github.com/yourusername/apphostfast.git
cd apphostfast

# 7. Create environment file
cp .env.example .env.local
nano .env.local  # Edit with your values

# 8. Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 9. Verify
docker ps
```

### Manual Step-by-Step

```bash
# 1. Connect to VPS
ssh root@your_vps_ip

# 2. Install Docker
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# 3. Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# 4. Clone repository
cd /opt
git clone https://github.com/yourusername/apphostfast.git
cd apphostfast

# 5. Copy and edit environment
cp .env.example .env.local

# Critical variables:
# - GITHUB_CLIENT_ID
# - GITHUB_CLIENT_SECRET  
# - JWT_SECRET (generate: openssl rand -base64 32)
# - DATABASE_URL (postgres://postgres:yourpassword@db:5432/apphostfast)
# - REDIS_URL (redis://redis:6379)

# 6. Create volumes directory
mkdir -p /var/lib/apphostfast/{postgres,redis,logs}

# 7. Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 8. Check status
docker-compose ps
docker-compose logs -f web

# 9. Verify API is working
curl http://localhost:3000/api/health
```

### Nginx Reverse Proxy Setup

```bash
# Install Nginx
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/apphostfast
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name apphostfast.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and test:

```bash
sudo ln -s /etc/nginx/sites-available/apphostfast /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Custom Domain Setup

### Route53 (AWS)

```bash
# 1. In Route53, create a CNAME record:
Name: yourdomain.com
Type: CNAME
Value: apphostfast-abc123.railway.app

# 2. Or A record if IP provided:
Name: yourdomain.com
Type: A
Value: 192.0.2.1
```

### Cloudflare

```bash
# 1. Add DNS record:
Type: CNAME
Name: yourdomain.com
Target: apphostfast.app
TTL: Auto
Proxy: Proxied (for Cloudflare SSL)
```

### GoDaddy / Namecheap

```bash
# 1. Login to registrar
# 2. Manage DNS
# 3. Add CNAME record:
   yourdomain.com → apphostfast-abc123.railway.app

# 4. Update in AppHostFast dashboard:
   Apps → Select App → Settings → Domain
   Enter: yourdomain.com
```

### Verify DNS

```bash
# Test DNS propagation
nslookup yourdomain.com
dig yourdomain.com
```

---

## SSL Certificate Management

### Automatic SSL (Let's Encrypt)

AppHostFast automatically provisions and renews SSL certificates via Let's Encrypt.

1. **Add custom domain** in dashboard
2. **DNS must be configured** (CNAME record pointing to your app)
3. **Wait 5-15 minutes** for DNS propagation
4. **SSL certificate auto-generated**
5. **Auto-renewal** happens every 60 days

### Check Certificate Status

```bash
# View certificate info
openssl s_client -connect yourdomain.com:443

# Check expiration
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Wildcard Certificates

For wildcard support, update DNS:

```dns
*.yourdomain.com CNAME apphostfast-abc123.railway.app
yourdomain.com CNAME apphostfast-abc123.railway.app
```

---

## Database & Environment Setup

### Database Initialization

```bash
# Access PostgreSQL in Docker
docker-compose exec db psql -U postgres -d apphostfast

# Create user
CREATE USER apphost WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE apphostfast TO apphost;

# View tables
\dt

# Exit
\q
```

### Initialize Prisma Schema

```bash
# Push schema to database
pnpm db:push

# Generate Prisma client
pnpm db:generate

# View database in studio
pnpm db:studio
```

### Backup Database

```bash
# Backup PostgreSQL
docker-compose exec db pg_dump -U postgres apphostfast > backup.sql

# Restore
docker-compose exec -T db psql -U postgres apphostfast < backup.sql
```

### Environment Variables Reference

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://apphostfast.yourdomain.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/apphostfast

# Cache & Queue
REDIS_URL=redis://:password@host:6379

# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# Security
JWT_SECRET=min_32_character_random_string

# Docker (if self-hosting)
DOCKER_HOST=unix:///var/run/docker.sock
DOCKER_REGISTRY_URL=registry.yourdomain.com

# Email (for notifications)
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxx
SMTP_FROM=noreply@apphostfast.dev

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
LOG_LEVEL=info
```

---

## Monitoring & Logs

### View Logs

```bash
# Docker logs
docker-compose logs -f web

# Real-time monitoring
docker-compose stats

# Specific service
docker-compose logs -f db
docker-compose logs -f redis
```

### Health Checks

```bash
# API health
curl https://apphostfast.yourdomain.com/api/health

# Database health
curl https://apphostfast.yourdomain.com/api/health | jq .services.database

# Redis health
redis-cli ping
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart web

# Full recreate
docker-compose down
docker-compose up -d
```

---

## Troubleshooting

### App won't start

```bash
# Check logs
docker-compose logs web

# Check health
curl localhost:3000/api/health

# Verify env vars
docker-compose exec web env | grep GITHUB
```

### Database connection issues

```bash
# Test connection
docker-compose exec db psql -U postgres -c "SELECT version();"

# Check DATABASE_URL
echo $DATABASE_URL

# Verify container is running
docker-compose ps db
```

### Port already in use

```bash
# Find process using port
lsof -i :3000

# Change port in docker-compose.yml
ports:
  - "8000:3000"
```

### SSL certificate issues

```bash
# Check certificate
openssl s_client -connect yourdomain.com:443

# Verify DNS
dig yourdomain.com
nslookup yourdomain.com

# Force renewal in traefik logs
docker-compose logs traefik | grep certificate
```

---

## Performance Optimization

### Database Optimization

```sql
-- Create indexes for faster queries
CREATE INDEX idx_users_email ON "User"(email);
CREATE INDEX idx_apps_userid ON "App"("userId");
CREATE INDEX idx_deployments_appid ON "Deployment"("appId");
```

### Redis Caching

```bash
# Monitor Redis
redis-cli MONITOR

# Check memory usage
redis-cli INFO memory

# Clear cache if needed
redis-cli FLUSHDB
```

### Docker Resource Limits

Edit `docker-compose.yml`:

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## Support

- **Documentation**: https://docs.apphostfast.dev
- **Issues**: https://github.com/yourusername/apphostfast/issues
- **Email**: support@apphostfast.dev
- **Discord**: https://discord.gg/apphostfast

---

Happy deploying! 🚀
