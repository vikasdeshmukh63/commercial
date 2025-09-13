#  Commercial App - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ 
- MongoDB (local or cloud)
- PM2 (for process management)
- Nginx (for reverse proxy)

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 2. Application Deployment

```bash
# Clone repository
git clone <your-repo-url>
cd -commercial-app

# Install dependencies
npm run install-all

# Create production environment file
cp .env.example .env
cp client/.env.example client/.env

# Edit environment variables
nano .env
```

### 3. Environment Configuration

**Root .env file:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/commercial_prod
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=30d
```

**Client .env file:**
```env
REACT_APP_API_URL=https://yourdomain.com/api
GENERATE_SOURCEMAP=false
```

### 4. Build Application

```bash
# Build React app
npm run build

# Setup database with initial data
npm run setup
```

### 5. PM2 Configuration

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'commercial',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### 6. Nginx Configuration

Create `/etc/nginx/sites-available/commercial`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Serve React app
    location / {
        root /path/to/commercial-app/client/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # API routes
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /static {
        root /path/to/commercial-app/client/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/commercial /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production
RUN cd client && npm ci --only=production

# Copy source code
COPY . .

# Build React app
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/commercial
      - JWT_SECRET=your_jwt_secret_here
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mongo_data:
```

Deploy with Docker:
```bash
docker-compose up -d
```

## ☁️ Cloud Deployment

### Heroku

1. **Prepare for Heroku:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create commercial-app
```

2. **Configure environment:**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret_here
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
```

3. **Deploy:**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### AWS EC2

1. **Launch EC2 instance** (Ubuntu 20.04 LTS)
2. **Configure security groups** (ports 22, 80, 443)
3. **Follow server setup steps above**
4. **Configure Route 53** for domain
5. **Setup CloudFront** for CDN (optional)

### DigitalOcean Droplet

1. **Create droplet** (Ubuntu 20.04)
2. **Follow server setup steps**
3. **Configure domain** in DigitalOcean DNS
4. **Setup monitoring** and backups

## 📊 Monitoring & Maintenance

### PM2 Monitoring
```bash
# View logs
pm2 logs commercial

# Monitor processes
pm2 monit

# Restart app
pm2 restart commercial

# View status
pm2 status
```

### Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db commercial_prod --out /backups/mongodb_$DATE
tar -czf /backups/mongodb_$DATE.tar.gz /backups/mongodb_$DATE
rm -rf /backups/mongodb_$DATE

# Add to crontab for daily backups
0 2 * * * /path/to/backup-script.sh
```

### Log Rotation
```bash
# Configure logrotate
sudo nano /etc/logrotate.d/commercial

/home/ubuntu/.pm2/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    notifempty
    create 0644 ubuntu ubuntu
    postrotate
        pm2 reloadLogs
    endscript
}
```

### Health Checks
```bash
# Add health check endpoint to server.js
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🔒 Security Checklist

- [ ] Use HTTPS with valid SSL certificate
- [ ] Set secure JWT secret (32+ characters)
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities
- [ ] Implement rate limiting
- [ ] Use secure headers

## 🚨 Troubleshooting

### Common Issues

**Port already in use:**
```bash
sudo lsof -ti:5000 | xargs kill -9
```

**MongoDB connection issues:**
```bash
sudo systemctl status mongod
sudo systemctl start mongod
```

**PM2 not starting:**
```bash
pm2 kill
pm2 start ecosystem.config.js --env production
```

**Nginx configuration errors:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Performance Optimization

1. **Enable gzip compression** in Nginx
2. **Use CDN** for static assets
3. **Implement caching** strategies
4. **Optimize database** queries
5. **Monitor resource** usage
6. **Scale horizontally** if needed

## 📈 Scaling

### Horizontal Scaling
- Use load balancer (Nginx/HAProxy)
- Deploy multiple app instances
- Use Redis for session storage
- Implement database clustering

### Vertical Scaling
- Increase server resources
- Optimize application code
- Use database indexing
- Implement caching layers

This deployment guide ensures your Commercial Management System runs reliably in production with proper security, monitoring, and scalability considerations.