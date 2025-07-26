# 🚀 Quick Start Guide - PAN Seva Pro Enhanced

Get your enhanced PAN Seva Pro platform running in minutes!

## Prerequisites

- **Node.js 18+** and npm
- **MongoDB** (local or Atlas)
- **Git** for version control

## 1. Installation

### Option A: Automatic Setup (Recommended)
```bash
# Make the deploy script executable (Linux/Mac)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Option B: Manual Setup
```bash
# Install all dependencies
npm run install:all

# Copy environment file
cp backend/.env.example backend/.env
```

## 2. Basic Configuration

Edit `backend/.env` with your basic settings:

```env
# Essential Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database (use local MongoDB or Atlas)
MONGODB_URI=mongodb://localhost:27017/pan-seva

# Security (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here
ENCRYPTION_KEY=your-32-byte-base64-encryption-key-here

# Basic SMS (optional for testing)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

## 3. Start Development Servers

```bash
# Start both frontend and backend
npm run start:full

# Or start separately:
# Backend: npm run backend
# Frontend: npm run dev
```

## 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 5. Test Basic Features

### Without External Services
- ✅ User interface and navigation
- ✅ Form validation
- ✅ Basic accessibility features
- ✅ Language switching
- ✅ Offline functionality (PWA)

### With MongoDB
- ✅ User registration/login
- ✅ Data persistence
- ✅ Application management

### With Twilio (SMS)
- ✅ OTP authentication
- ✅ SMS notifications

## 6. Advanced Configuration (Optional)

### Microsoft OneDrive Integration
```env
MICROSOFT_TENANT_ID=your-azure-tenant-id
MICROSOFT_CLIENT_ID=your-azure-client-id
MICROSOFT_CLIENT_SECRET=your-azure-client-secret
```

### OpenAI Integration
```env
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
```

### Voice Call Integration
```env
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook
VOICE_CALL_WEBHOOK_URL=https://your-n8n-instance.com/webhook/voice-call
```

## 7. Production Deployment

### Environment Setup
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pan-seva
FRONTEND_URL=https://your-domain.com
```

### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start backend/server.js --name "pan-seva-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 8. Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3001
npx kill-port 3001

# Or change PORT in backend/.env
```

**MongoDB connection failed:**
```bash
# Start local MongoDB
mongod

# Or use MongoDB Atlas connection string
```

**Dependencies installation failed:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules backend/node_modules
npm run install:all
```

**Build errors:**
```bash
# Check Node.js version (should be 18+)
node -v

# Update dependencies
npm update
cd backend && npm update
```

## 9. Feature Testing Checklist

### Core Features ✅
- [ ] User registration with OTP
- [ ] PAN application form
- [ ] Document upload
- [ ] Payment processing
- [ ] Application tracking

### Enhanced Features 🚀
- [ ] Voice assistance
- [ ] Multi-language support
- [ ] Accessibility features
- [ ] OneDrive integration
- [ ] End-to-end encryption
- [ ] Admin dashboard
- [ ] Audit logging
- [ ] PWA functionality

### Advanced Features 🔥
- [ ] AI voice calls
- [ ] RPA automation
- [ ] Real-time notifications
- [ ] Document guide animations
- [ ] UPI deep links
- [ ] Bulk admin actions

## 10. Next Steps

1. **Configure External Services**: Set up Twilio, OpenAI, Azure, etc.
2. **Customize Branding**: Update logos, colors, and content
3. **Add Content**: Create help documentation and FAQs
4. **Security Review**: Implement additional security measures
5. **Performance Testing**: Load test with expected traffic
6. **Monitoring Setup**: Configure error tracking and analytics

## 📞 Support

- **Documentation**: Check README.md for detailed information
- **Issues**: Create GitHub issues for bugs or feature requests
- **Community**: Join our community forum for discussions

## 🎉 You're Ready!

Your enhanced PAN Seva Pro platform is now ready with:
- 🎤 AI-powered voice assistance
- 🔒 End-to-end encryption
- ☁️ Cloud storage integration
- ♿ Full accessibility compliance
- 🌍 Multi-language support
- 📱 PWA functionality
- 🤖 Automated processing
- 📊 Comprehensive admin tools

Happy coding! 🚀