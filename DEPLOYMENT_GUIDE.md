# 🚀 Deployment Guide - BabaFly

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account with repository
- Vercel account (sign up at https://vercel.com)

### Step-by-Step Deployment

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: BabaFly e-commerce platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/babafly.git
git push -u origin main
```

#### 2. Connect to Vercel
1. Visit https://vercel.com/new
2. Import your GitHub repository
3. Select "BabaFly" repo
4. Click "Import"

#### 3. Configure Environment Variables
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add the following:
   ```
   VITE_API_URL=https://your-backend-api.com/api
   ```
3. Click "Save"

#### 4. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app is live at `https://your-project-name.vercel.app`

### Automatic Deployments
- Every push to `main` branch automatically deploys
- Preview deployments for pull requests
- Rollback any deployment from dashboard

---

## Option 2: Deploy to Netlify

### Prerequisites
- GitHub account with repository
- Netlify account (sign up at https://netlify.com)

### Step-by-Step Deployment

#### 1. Push to GitHub (Same as above)

#### 2. Connect to Netlify
1. Visit https://app.netlify.com/start
2. Click "Connect to Git"
3. Select "GitHub"
4. Authorize Netlify
5. Select your repository

#### 3. Configure Build Settings
```
Build command: npm run build
Publish directory: dist
```

#### 4. Add Environment Variables
1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add:
   ```
   VITE_API_URL=https://your-backend-api.com/api
   ```

#### 5. Deploy
1. Click "Deploy"
2. Wait for build completion
3. Your app is live at `https://your-site-name.netlify.app`

### Create netlify.toml
Create a `netlify.toml` file in root directory:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test authentication (login/register)
- [ ] Test product filtering and search
- [ ] Test add to cart functionality
- [ ] Test checkout process
- [ ] Check responsive design on mobile
- [ ] Verify API calls are working
- [ ] Test error handling scenarios

---

## Environment Variables Reference

### Development (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Production (Vercel/Netlify Dashboard)
```
VITE_API_URL=https://api.yourdomain.com/api
```

---

## Troubleshooting Deployments

### Build Failing
- Check Node version (should be v18+ or v20+)
- Verify all dependencies: `npm install`
- Check for console errors: `npm run build`

### API Calls Not Working
- Verify `VITE_API_URL` is correct
- Check CORS settings on backend
- Ensure backend is running and accessible

### Blank Page After Deployment
- Check browser console for errors
- Clear browser cache
- Verify SPA redirect in deployment config

### Performance Issues
- Check bundle size: `npm run build`
- Enable gzip compression on server
- Optimize images
- Use CDN for static assets

---

## Advanced Deployment Options

### Custom Domain
1. **Vercel**: Settings → Domains → Add Domain
2. **Netlify**: Site Settings → Domain Management → Add Custom Domain

### SSL Certificate
- Automatically provided by both platforms
- HTTPS enabled by default

### Analytics
- **Vercel**: Built-in Web Analytics
- **Netlify**: Netlify Analytics (paid feature)

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor API performance
- Track user analytics

---

## Continuous Deployment Workflow

```
Local Development
        ↓
Git Commit & Push
        ↓
GitHub Workflow (Tests & Build)
        ↓
Auto Deploy to Staging
        ↓
Preview & Review
        ↓
Merge to Main
        ↓
Production Deploy
```

---

## Production Optimization Tips

1. **Enable Gzip Compression**
   - Vercel: Automatic
   - Netlify: Automatic

2. **Use CDN**
   - Both platforms use global CDN
   - Assets automatically cached

3. **Optimize Images**
   - Use WebP format
   - Lazy load images
   - Use appropriate sizes

4. **Code Splitting**
   - Vite automatically handles this
   - Routes are lazy loaded

5. **Monitoring & Logging**
   - Use Sentry for error tracking
   - Monitor Core Web Vitals

---

## Rollback & Version Management

### Vercel
1. Go to Deployments
2. Find the deployment to rollback
3. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys
2. Find the deployment
3. Click "Publish deploy"

---

## Frequently Asked Questions

**Q: How long does deployment take?**
A: Typically 2-5 minutes on both platforms

**Q: Can I preview before going live?**
A: Yes! Both provide preview URLs for every deployment

**Q: How do I update after deployment?**
A: Just push to main branch - automatic deployment happens

**Q: Can I rollback easily?**
A: Yes! Both platforms maintain full deployment history

**Q: Is there a CDN?**
A: Yes, both use global CDN for fast content delivery

---

## Need Help?

- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://www.netlify.com/support
- **Project Issues**: Check GitHub Issues section

---

**Deployment Complete! 🎉**
