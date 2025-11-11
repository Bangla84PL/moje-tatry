# Debugging Guide

**Project:** moje-tatry
**Last Updated:** 2025-11-11

## General Debugging Strategy

1. **Reproduce the issue** consistently
2. **Isolate the problem** - narrow down the scope
3. **Check recent changes** - what changed?
4. **Review logs** - what do they tell you?
5. **Use debugger** - step through the code
6. **Ask for help** - if stuck, reach out

## Common Issues

### Issue: Application Won't Start

**Symptoms:**
- Server crashes on startup
- Port already in use error
- Module not found errors

**Solutions:**
```bash
# Check if port is in use
lsof -i :3000
# Kill the process if needed
kill -9 [PID]

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check environment variables
cat .env
# Compare with .env.example
```

### Issue: Database Connection Failed

**Symptoms:**
- "Connection refused" errors
- Timeout errors
- Authentication failures

**Solutions:**
```bash
# Check database is running
# PostgreSQL
pg_isready

# Check connection string
echo $DATABASE_URL

# Test connection manually
psql $DATABASE_URL

# Check database logs
tail -f /var/log/postgresql/postgresql-*.log
```

### Issue: API Returns 500 Error

**Symptoms:**
- Internal server error
- Stack trace in logs
- Request hangs

**Solutions:**
1. **Check server logs:**
   ```bash
   # Development
   npm run dev

   # Production logs
   pm2 logs
   ```

2. **Enable debug logging:**
   ```javascript
   console.log('Request received:', req.body);
   console.log('Query result:', result);
   ```

3. **Use debugger:**
   ```javascript
   debugger; // Add breakpoint
   ```

4. **Check error handling:**
   - Are errors being caught?
   - Are error messages logged?
   - Is error response formatted correctly?

## Debugging Tools

### Backend (Node.js)

**Built-in Debugger:**
```bash
node --inspect-brk server.js
# Then open chrome://inspect in Chrome
```

**VS Code Debugger:**
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "skipFiles": ["<node_internals>/**"],
  "program": "${workspaceFolder}/server.js"
}
```

**Logging:**
```javascript
import debug from 'debug';
const log = debug('app:server');

log('Server starting...');
```

### Frontend (React)

**React DevTools:**
- Install browser extension
- Inspect component tree
- Check props and state

**Console Logging:**
```javascript
console.log('Component rendered:', props);
console.table(data); // For arrays/objects
console.trace(); // Stack trace
```

**Performance:**
```javascript
console.time('operation');
// ... code to measure
console.timeEnd('operation');
```

### Database

**PostgreSQL:**
```sql
-- Enable query logging
ALTER SYSTEM SET log_statement = 'all';

-- Check slow queries
SELECT * FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Explain query plan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## Production Debugging

### Accessing Logs

```bash
# Application logs
pm2 logs [app-name]

# Nginx logs
tail -f /var/log/nginx/error.log

# System logs
journalctl -u [service-name] -f
```

### Performance Issues

**Tools:**
- New Relic / Datadog for APM
- Chrome DevTools Performance tab
- Lighthouse for web vitals

**Check:**
1. Database query performance
2. API response times
3. Memory usage
4. CPU usage

### Memory Leaks

**Detection:**
```bash
# Check memory usage
node --inspect --expose-gc server.js
# Take heap snapshots in Chrome DevTools
```

**Common causes:**
- Event listeners not removed
- Timers not cleared
- References not released
- Large caches

## Testing in Different Environments

### Local vs Staging vs Production

**Environment Variables:**
```bash
# Local
NODE_ENV=development

# Staging
NODE_ENV=staging

# Production
NODE_ENV=production
```

**Feature Flags:**
Use feature flags to test in production safely.

## When to Ask for Help

If you've spent >2 hours without progress:

1. **Document what you've tried**
2. **Create minimal reproduction**
3. **Ask in team chat or GitHub issue**
4. **Include:**
   - What you expected
   - What actually happened
   - Steps to reproduce
   - Environment details
   - Relevant logs/screenshots

## Useful Commands

```bash
# Find large files
du -sh * | sort -h

# Monitor resource usage
top
htop

# Network debugging
netstat -tuln
curl -v https://api.example.com

# Git debugging
git log --oneline --graph
git diff HEAD~1

# Package debugging
npm ls [package-name]
npm why [package-name]
```

---
**Version:** 1.0
