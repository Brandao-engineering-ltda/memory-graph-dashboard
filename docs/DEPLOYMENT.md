# 🚀 Deployment Guide

This guide covers deploying the Memory Graph Dashboard to various platforms.

## 📋 Prerequisites

- Node.js 18+
- Memory data files (or sample data will be used)
- Environment variables configured

## 🌐 Vercel (Recommended)

### Automatic Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `memory-graph-dashboard`

2. **Configure Environment Variables**
   ```env
   MEMORY_DATA_PATH=/tmp/memory
   ENABLE_SEMANTIC_SEARCH=true
   DEFAULT_THEME=dark
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Custom domain support available

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🐳 Docker

### Build Image

```bash
# Build
docker build -t memory-graph-dashboard .

# Run with local memory data
docker run -p 3000:3000 \
  -v /path/to/memory:/app/memory \
  -e MEMORY_DATA_PATH=/app/memory \
  memory-graph-dashboard
```

### Docker Compose

```yaml
version: '3.8'
services:
  memory-graph:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./memory:/app/memory
    environment:
      - MEMORY_DATA_PATH=/app/memory
      - NODE_ENV=production
```

## 🏠 Self-Hosted

### PM2 (Process Manager)

```bash
# Build production version
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "memory-graph" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

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

## ☁️ Other Platforms

### Netlify
```bash
# Build command
npm run build && npm run export

# Publish directory
out/
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway deploy
```

### DigitalOcean App Platform
1. Connect GitHub repository
2. Configure build command: `npm run build`
3. Configure run command: `npm start`
4. Set environment variables

## 🔧 Environment Configuration

### Production Variables
```env
# Required
MEMORY_DATA_PATH=/path/to/memory/files
NODE_ENV=production

# Optional
ENABLE_SEMANTIC_SEARCH=true
SEARCH_MAX_RESULTS=50
DEFAULT_THEME=dark
ENABLE_ANIMATIONS=true
GRAPH_MAX_NODES=500
ENABLE_CACHING=true
CACHE_DURATION=300
```

### Security Considerations

1. **Environment Variables**
   - Never commit sensitive data
   - Use platform-specific secret management

2. **Memory Data**
   - Secure file permissions
   - Consider encryption for sensitive data
   - Regular backups

3. **Network Security**
   - HTTPS only in production
   - Rate limiting
   - CORS configuration

## 📊 Monitoring

### Health Checks
```bash
# API health check
curl https://your-domain.com/api/memory

# Expected response
{
  "entities": 22,
  "relationships": 161,
  "healthy": true
}
```

### Logging
```javascript
// Check application logs
pm2 logs memory-graph

// Or with Docker
docker logs container-name
```

## 🔄 Updates

### Zero-Downtime Updates
```bash
# With PM2
git pull origin main
npm install
npm run build
pm2 reload memory-graph

# With Docker
docker build -t memory-graph-dashboard:new .
docker stop memory-graph-old
docker run --name memory-graph-new memory-graph-dashboard:new
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+)
- Clear cache: `rm -rf .next node_modules && npm install`
- Verify all dependencies are installed

**Memory Data Not Loading**
- Verify `MEMORY_DATA_PATH` is correct
- Check file permissions
- Ensure memory files exist and are readable

**Performance Issues**
- Enable caching: `ENABLE_CACHING=true`
- Reduce graph nodes: `GRAPH_MAX_NODES=200`
- Optimize memory file size

**API Errors**
- Check memory script paths
- Verify Node.js can execute memory scripts
- Review application logs

## 🔗 Platform-Specific Guides

- [Vercel Deployment](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [PM2 Guide](https://pm2.keymetrics.io/docs)
- [Nginx Configuration](https://nginx.org/en/docs)

## 📞 Support

- Create an issue on GitHub
- Check existing deployment discussions
- Review platform documentation

---

Happy deploying! 🎉