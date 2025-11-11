# Deployment Guide

**Project:** moje-tatry
**Last Updated:** 2025-11-11

## Environments

### Development
- **URL:** http://localhost:3000
- **Database:** Local PostgreSQL
- **Purpose:** Local development

### Staging
- **URL:** https://staging.example.com
- **Database:** Staging database
- **Purpose:** Pre-production testing

### Production
- **URL:** https://example.com
- **Database:** Production database
- **Purpose:** Live application

## Prerequisites

### Required
- [ ] Access to hosting platform
- [ ] Database credentials
- [ ] Environment variables configured
- [ ] SSL certificates (production)

### Tools
- Docker (optional)
- CI/CD pipeline configured
- Monitoring tools

## Deployment Process

### Manual Deployment

**1. Build Application:**
```bash
# Install dependencies
npm install --production

# Build
npm run build

# Test build locally
npm start
```

**2. Run Tests:**
```bash
npm test
npm run test:e2e
```

**3. Deploy:**
```bash
# Example: Deploy to server
scp -r dist/ user@server:/var/www/app/
ssh user@server 'pm2 restart app'
```

### Automated Deployment (CI/CD)

**GitHub Actions Example:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
      - run: npm run build
      - name: Deploy
        run: |
          # Deploy to production
```

## Environment Configuration

### Environment Variables

**Required:**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
API_KEY=your-key
```

**How to Set:**

**Vercel/Netlify:**
- Dashboard → Settings → Environment Variables

**Docker:**
```bash
docker run -e NODE_ENV=production -e DATABASE_URL=...
```

**PM2:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'app',
    script: './dist/server.js',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: process.env.DATABASE_URL
    }
  }]
}
```

## Database Migrations

**Before Deployment:**
```bash
# Review pending migrations
npm run migration:status

# Run migrations
npm run migration:run

# If issues, rollback
npm run migration:rollback
```

**Production Safety:**
1. Backup database first
2. Test migrations on staging
3. Run during low-traffic hours
4. Have rollback plan ready

## Health Checks

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "version": "1.0.0",
  "uptime": 123456
}
```

**Monitoring:**
- Set up health check alerts
- Monitor error rates
- Track response times

## Rollback Procedure

**If deployment fails:**

1. **Immediate Rollback:**
   ```bash
   git revert HEAD
   git push
   # Or redeploy previous version
   ```

2. **Database Rollback:**
   ```bash
   npm run migration:rollback
   ```

3. **Notify Team:**
   - Alert in team chat
   - Create incident report

## Scaling

### Horizontal Scaling
```bash
# Add more instances
pm2 scale app +2

# Load balancer distributes traffic
```

### Vertical Scaling
- Upgrade server resources
- Increase database capacity

### Database Scaling
- Add read replicas
- Enable connection pooling
- Optimize slow queries

## Monitoring & Alerts

### Application Monitoring
- **Tool:** [New Relic / Datadog / etc]
- **Metrics:** Error rate, response time, throughput

### Infrastructure Monitoring
- **Tool:** [CloudWatch / Grafana / etc]
- **Metrics:** CPU, memory, disk, network

### Alerts
- 500 errors > threshold
- Response time > 2 seconds
- Database connection failures
- Disk space < 20%

## Security Checklist

- [ ] HTTPS enabled
- [ ] Secrets in environment variables (not code)
- [ ] Database credentials rotated
- [ ] Firewall configured
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Security headers set
- [ ] Dependencies updated

## Common Deployment Issues

### Issue: Build Fails

**Check:**
- Node version matches
- All dependencies installed
- Environment variables set
- Build script works locally

### Issue: Database Migration Fails

**Solutions:**
- Check database connection
- Review migration SQL
- Ensure proper permissions
- Rollback and retry

### Issue: 503 Service Unavailable

**Check:**
- Application actually running?
- Enough resources (RAM/CPU)?
- Database accessible?
- Load balancer healthy?

## Post-Deployment Checklist

- [ ] Application accessible
- [ ] Health check passing
- [ ] Database migrations applied
- [ ] No errors in logs
- [ ] Monitoring active
- [ ] SSL certificate valid
- [ ] Performance acceptable
- [ ] Smoke tests passed

## Deployment Schedule

**Regular Deployments:**
- Staging: Daily (automatic)
- Production: Weekly (manual approval)

**Hotfixes:**
- Can be deployed anytime
- Requires approval from 2 team members

---
**Version:** 1.0
