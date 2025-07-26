# Deployment Guide for PAN Seva Pro

## 🚀 Production Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment Variables (set in Vercel dashboard)
VITE_API_BASE_URL=https://your-backend-url.com/api
```

#### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder to Netlify

# Environment Variables (set in Netlify dashboard)
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### Backend Deployment (Railway/Heroku/DigitalOcean)

#### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

#### Heroku Deployment
```bash
# Install Heroku CLI
# Create Procfile in backend directory
echo "web: node server.js" > backend/Procfile

# Deploy
heroku create pan-seva-backend
git subtree push --prefix backend heroku main
```

#### DigitalOcean App Platform
```yaml
# app.yaml
name: pan-seva-backend
services:
- name: api
  source_dir: /backend
  github:
    repo: your-username/pan-seva-pro
    branch: main
  run_command: node server.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: PORT
    value: "8080"
```

### Database Setup (MongoDB Atlas)

```bash
# 1. Create MongoDB Atlas account
# 2. Create a new cluster
# 3. Get connection string
# 4. Add to environment variables

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pan-seva
```

### Environment Variables for Production

#### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_APP_NAME=PAN Seva Pro
VITE_APP_VERSION=1.0.0
```

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-frontend-url.com

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pan-seva

# JWT
JWT_SECRET=your-super-secure-jwt-secret-for-production
JWT_EXPIRES_IN=7d

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-production-twilio-sid
TWILIO_AUTH_TOKEN=your-production-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your-production-razorpay-key
RAZORPAY_KEY_SECRET=your-production-razorpay-secret

# File Storage (AWS S3 or similar)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BUCKET_NAME=pan-seva-documents
AWS_REGION=us-east-1

# Redis (for caching)
REDIS_URL=redis://your-redis-url:6379

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-for-production
```

## 🔧 Production Optimizations

### Frontend Optimizations
```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/assets/*.js
```

### Backend Optimizations
```javascript
// Add to server.js for production
if (process.env.NODE_ENV === 'production') {
  // Enable compression
  app.use(compression());
  
  // Serve static files
  app.use(express.static('public'));
  
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
}
```

### Database Optimizations
```javascript
// Add indexes for better performance
db.users.createIndex({ "phoneNumber": 1 }, { unique: true });
db.applications.createIndex({ "phoneNumber": 1, "createdAt": -1 });
db.documents.createIndex({ "applicationId": 1, "type": 1 });
db.payments.createIndex({ "phoneNumber": 1, "createdAt": -1 });
```

## 📊 Monitoring & Analytics

### Application Monitoring
```bash
# Install monitoring tools
npm install --save @sentry/node @sentry/react

# Add to backend
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });

# Add to frontend
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

### Performance Monitoring
```javascript
// Add performance monitoring
const performanceMonitoring = {
  trackPageLoad: (pageName) => {
    // Track page load times
  },
  trackAPICall: (endpoint, duration) => {
    // Track API response times
  },
  trackVoiceRecognition: (duration, success) => {
    // Track voice recognition performance
  }
};
```

## 🔒 Security Checklist

### Frontend Security
- [ ] Environment variables properly configured
- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced
- [ ] Content Security Policy implemented
- [ ] XSS protection enabled

### Backend Security
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] JWT tokens properly secured
- [ ] File upload restrictions in place
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Database queries parameterized
- [ ] Sensitive data encrypted

### Infrastructure Security
- [ ] SSL certificates installed
- [ ] Database access restricted
- [ ] API keys secured
- [ ] Regular security updates
- [ ] Backup strategy implemented

## 🚨 Disaster Recovery

### Backup Strategy
```bash
# Database backup (MongoDB)
mongodump --uri="mongodb+srv://..." --out=backup-$(date +%Y%m%d)

# File storage backup
aws s3 sync s3://pan-seva-documents s3://pan-seva-backup-$(date +%Y%m%d)
```

### Recovery Procedures
1. **Database Recovery**: Restore from latest backup
2. **File Recovery**: Restore from S3 backup
3. **Application Recovery**: Redeploy from Git repository
4. **DNS Recovery**: Update DNS records if needed

## 📈 Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Multiple backend instances
- Database clustering
- CDN for static assets

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching strategies
- Optimize bundle sizes

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Railway
      uses: railway-app/railway-action@v1
      with:
        token: ${{ secrets.RAILWAY_TOKEN }}
```

## 📞 Support & Maintenance

### Health Checks
```javascript
// Add health check endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
});
```

### Logging
```javascript
// Structured logging
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

**Production Deployment Checklist Complete ✅**