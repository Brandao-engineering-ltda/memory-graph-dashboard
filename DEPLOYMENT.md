# Deployment Guide

## Production Deployment

### Environment Variables

Create a `.env.local` file (not tracked in git):

```bash
# Memory data configuration
MEMORY_DATA_PATH=./memory
MEMORY_FILE_PATTERNS=*.md,*.txt

# Performance settings
GRAPH_REBUILD_INTERVAL=300000
MAX_ENTITIES_PER_UPDATE=1000
SEARCH_MAX_RESULTS=50

# Feature toggles
ENABLE_SEMANTIC_SEARCH=true
ENABLE_AI_INSIGHTS=true
ENABLE_ANIMATIONS=true
GRAPH_PHYSICS_ENABLED=true

# Analytics
ANALYTICS_HISTORY_DAYS=30

# Production settings (recommended)
NODE_ENV=production
```

### Build & Deploy

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Production Optimizations Applied

✅ **Performance**
- Console.log removal in production builds
- Image optimization (WebP, AVIF)
- Gzip compression enabled
- Bundle size optimized (removed unused dependencies)

✅ **Security**
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Powered-by header disabled
- Error handling sanitized for production

✅ **Monitoring**
- Silent error handling in production
- Development-only debug logging
- Health check API endpoint

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Memory Data Integration

For full functionality, ensure your memory data is available at the configured path:
- `MEMORY_DATA_PATH/get-stats.js` - Statistics script
- `MEMORY_DATA_PATH/graph/knowledge-graph.json` - Graph data
- `MEMORY_DATA_PATH/*.md` - Memory files

The dashboard gracefully degrades to demo mode if memory data is unavailable.