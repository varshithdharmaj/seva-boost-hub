<<<<<<< HEAD
# PAN Seva Pro - AI-Powered Voice Assistant for PAN Applications

A comprehensive, enterprise-grade PAN card application system with advanced AI capabilities, multilingual support, end-to-end encryption, and full accessibility compliance.

## 🚀 Enhanced Features
=======
>>>>>>> 89256d8307ba6b2cae997f6be01cd9c035cbd4fb

### 🎤 Advanced Voice Experience
- **Multilingual Voice Recognition**: Support for 11 Indian languages (Telugu, Hindi, English, Tamil, Bengali, Marathi, Kannada, Gujarati, Malayalam, Punjabi, Urdu)
- **AI-Powered Voice Calls**: Integration with n8n + Twilio for realistic voice assistance
- **Natural Language Processing**: GPT-4o-mini powered conversational interface
- **Voice Command Processing**: Complete applications using voice commands with Whisper API
- **Smart Fallback**: Automatic switch to text input when voice fails

### 🔒 End-to-End Encryption
- **Client-Side Encryption**: AES-256 encryption before data leaves the browser
- **Zero-Knowledge Server**: Server never sees unencrypted user data
- **Secure File Storage**: All documents encrypted before OneDrive storage
- **Key Management**: Secure key generation and storage

<<<<<<< HEAD
### ☁️ OneDrive Cloud Integration
- **Microsoft Graph API**: Seamless OneDrive integration
- **User-Specific Folders**: Isolated storage for each user
- **Share-Safe URLs**: Secure document sharing capabilities
- **Automatic Backup**: All documents and invoices backed up to cloud

### 🤖 Advanced AI Capabilities
- **Document Validation**: AI-powered document quality and authenticity checks
- **Real-time Feedback**: Instant validation with suggestions for improvement
- **Smart Corrections**: Auto-correction of common input errors
- **Confidence Scoring**: AI confidence levels for all validations
- **Error Reporting**: Side-by-side comparison with expected examples
=======
(https://lovable.dev/projects/658e424a-fc14-45d1-aaa8-24d6b87f6114) and start prompting.
>>>>>>> 89256d8307ba6b2cae997f6be01cd9c035cbd4fb

### 🤖 Automated PAN Submission & Tracking
- **RPA Integration**: Automated submission to NSDL/UTIITSL portals
- **Real-Time Status Tracking**: 6-hourly automated status checks
- **Multi-Channel Notifications**: SMS, email, push, and in-app notifications
- **Live Timeline**: Visual progress tracking with status updates

### 📱 Enhanced Mobile Experience
- **PWA Support**: Full Progressive Web App with offline functionality
- **Service Worker**: Advanced caching and background sync
- **Push Notifications**: Real-time status updates
- **Offline Fallback**: Chat interface works offline

### 💳 Advanced Payment System
- **UPI Deep Links**: Direct integration with Google Pay, PhonePe, Paytm
- **Dynamic QR Codes**: Auto-generated payment QR codes
- **Multiple Payment Methods**: UPI, Cards, Net Banking, Wallets
- **Auto-Download Invoices**: Instant PDF generation and download
- **Payment Analytics**: Comprehensive payment tracking and reporting

### ♿ WCAG 2.2 Level AA Compliance
- **High Contrast Mode**: Toggle for enhanced visibility
- **Large Font Support**: Adjustable font sizes
- **Screen Reader Support**: Full NVDA, JAWS, and VoiceOver compatibility
- **Keyboard Navigation**: Complete keyboard accessibility
- **ARIA Compliance**: Semantic HTML with proper ARIA labels
- **Focus Management**: Advanced focus indicators and management

### 🌍 Comprehensive Internationalization
- **11 Language Support**: Full localization for all major Indian languages
- **RTL Support**: Right-to-left layout for Urdu
- **Browser Detection**: Automatic language detection
- **Cultural Formatting**: Locale-specific number, date, and currency formatting

### 🎨 Interactive Document Guides
- **Lottie Animations**: Step-by-step visual guides for document capture
- **Auto-Play Guides**: First-time automatic playback
- **Replay Functionality**: On-demand guide replay
- **Framing Assistance**: Exact positioning and lighting guidance

### 👨‍💼 Advanced Admin Dashboard
- **Bulk Actions**: Multi-select operations (SMS, verification, downloads)
- **Audit Logs**: Comprehensive activity tracking with encryption
- **Analytics Dashboard**: Real-time statistics and reporting
- **User Management**: Advanced user administration tools
- **Document Management**: Bulk document operations

### 📊 Audit & Compliance
- **Immutable Audit Logs**: Every action logged with encryption
- **7-Year Retention**: Configurable log retention policies
- **Export Capabilities**: CSV export for compliance reporting
- **Admin Filtering**: Advanced log filtering and search

### 🔄 Background Processing
- **Cron Jobs**: Automated status checking every 6 hours
- **Background Sync**: Offline data synchronization
- **Health Monitoring**: System health checks and alerts
- **Cleanup Jobs**: Automated maintenance and optimization

### 📈 Performance & Monitoring
- **Lazy Loading**: Optimized loading for animations and heavy components
- **Service Worker Caching**: Advanced caching strategies
- **Performance Monitoring**: Real-time performance tracking
- **Error Reporting**: Comprehensive error tracking and reporting

### 🔐 Security Features
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Server-side validation of all inputs
- **File Upload Security**: Restricted file types and sizes
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Security headers for all responses

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Hook Form** with Zod validation
- **Tanstack Query** for data fetching
- **Web Speech API** for voice recognition

### Backend
- **Node.js** with Express.js
- **JWT** for authentication
- **Multer** for file uploads
- **Express Validator** for input validation
- **Rate Limiting** for security
- **CORS** and **Helmet** for security

### AI/ML Services
- **Web Speech API** for speech recognition
- **Speech Synthesis API** for text-to-speech
- **Custom AI validation** for document processing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Modern browser with Web Speech API support

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd pan-seva-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your configuration
nano .env

# Start the server
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:

<<<<<<< HEAD
```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# SMS Configuration (Optional - for production)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🚀 Quick Start

1. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

4. **Test the Application**:
   - Use any 10-digit mobile number
   - For demo purposes, use OTP: `123456`
   - Try voice commands by clicking the microphone icon

## 📱 Usage Guide

### Voice Commands
- **"Start new PAN application"** - Begin a new application
- **"My name is [Your Name]"** - Fill name fields
- **"My mobile number is [Number]"** - Fill mobile number
- **"My address is [Address]"** - Fill address fields
- **"Upload document"** - Navigate to document upload
- **"Check status"** - View application status

### Supported Languages
- **English**: Full voice recognition and synthesis
- **Hindi**: Voice recognition with English synthesis
- **Telugu**: Voice recognition with English synthesis

### Document Types
- **Identity Proof**: Aadhaar, Passport, Voter ID, Driving License
- **Address Proof**: Utility bills, Bank statements, Rent agreement
- **Photograph**: Passport-size photo with white background
- **Signature**: Clear signature on white paper

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to mobile number
- `POST /api/auth/verify-otp` - Verify OTP and authenticate
- `POST /api/auth/resend-otp` - Resend OTP

### PAN Applications
- `POST /api/pan/apply` - Submit new PAN application
- `GET /api/pan/applications` - Get user applications
- `GET /api/pan/status/:id` - Get application status
- `GET /api/pan/track/:id` - Track application progress

### Document Management
- `POST /api/documents/upload` - Upload document with AI validation
- `GET /api/documents/user/all` - Get user documents
- `DELETE /api/documents/:id` - Delete document
- `POST /api/documents/:id/revalidate` - Re-run AI validation

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/invoice/:id` - Generate invoice

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
cd backend
npm run test
```

### Voice Testing
1. Enable microphone permissions
2. Test in Chrome/Edge (best Web Speech API support)
3. Use clear speech in quiet environment
4. Try different languages and accents

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse of API endpoints
- **Input Validation**: Server-side validation of all inputs
- **File Upload Security**: Restricted file types and sizes
- **JWT Authentication**: Secure token-based authentication
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Security headers for all responses

## 🌐 Browser Support

### Recommended Browsers
- **Chrome 80+** (Best Web Speech API support)
- **Edge 80+** (Good Web Speech API support)
- **Firefox 70+** (Limited Web Speech API support)
- **Safari 14+** (Limited Web Speech API support)

### Mobile Support
- **Chrome Mobile** (Android)
- **Safari Mobile** (iOS - limited voice features)
- **Samsung Internet**
- **Firefox Mobile**

## 📊 Performance

- **Lighthouse Score**: 95+ for Performance, Accessibility, SEO
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Voice Recognition Latency**: < 500ms
- **Document Upload**: Supports up to 5MB files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@panseva.pro
- Documentation: [docs.panseva.pro](https://docs.panseva.pro)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Voice-enabled PAN applications
- ✅ Mobile authentication
- ✅ AI document validation
- ✅ Payment integration

### Phase 2 (Upcoming)
- 🔄 Advanced AI features
- 🔄 Offline voice recognition
- 🔄 Multi-language UI
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Integration with government APIs
- 📋 Blockchain verification
- 📋 Advanced biometric authentication
- 📋 IoT device support

---

**Made with ❤️ for Digital India Initiative**
## 🛠️ Enh
anced Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Hook Form** with Zod validation
- **Tanstack Query** for data fetching
- **Web Speech API** for voice recognition
- **Crypto-JS** for client-side encryption
- **i18next** for internationalization
- **Lottie React** for animations
- **QR Code** generation
- **Workbox** for PWA functionality

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Express Validator** for input validation
- **Rate Limiting** for security
- **CORS** and **Helmet** for security
- **Microsoft Graph API** for OneDrive
- **Twilio** for SMS and voice calls
- **OpenAI API** for AI processing
- **Puppeteer** for RPA automation
- **Node-cron** for scheduled tasks
- **Winston** for logging
- **Sharp** for image processing
- **Archiver** for ZIP generation

### AI/ML Services
- **OpenAI GPT-4o-mini** for conversational AI
- **Whisper API** for speech-to-text
- **OpenAI TTS** for text-to-speech
- **Custom AI validation** for document processing

### Cloud & Infrastructure
- **Microsoft OneDrive** for cloud storage
- **n8n** for workflow automation
- **Redis** for caching
- **MongoDB Atlas** for database
- **Azure** for Microsoft Graph API

## 📦 Enhanced Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Redis (optional, for caching)
- Microsoft Azure account (for OneDrive)
- Twilio account (for SMS/Voice)
- OpenAI API key
- n8n instance (for voice workflows)

### Environment Setup

#### Backend Environment Variables
Create a `.env` file in the backend directory with all the enhanced configurations:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/pan-seva

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Microsoft Graph API (OneDrive Integration)
MICROSOFT_TENANT_ID=your-azure-tenant-id
MICROSOFT_CLIENT_ID=your-azure-client-id
MICROSOFT_CLIENT_SECRET=your-azure-client-secret
MICROSOFT_REDIRECT_URI=http://localhost:3001/api/auth/microsoft/callback

# End-to-End Encryption
ENCRYPTION_KEY=your-32-byte-base64-encryption-key-here
ENCRYPTION_ALGORITHM=aes-256-gcm

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini

# n8n Webhook Configuration
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com/webhook
N8N_WEBHOOK_SECRET=your-n8n-webhook-secret

# Voice Call Configuration
VOICE_CALL_WEBHOOK_URL=https://your-n8n-instance.com/webhook/voice-call
WHISPER_API_URL=https://api.openai.com/v1/audio/transcriptions
TTS_SERVICE_URL=https://api.openai.com/v1/audio/speech

# RPA Configuration
RPA_NSDL_USERNAME=your-nsdl-username
RPA_NSDL_PASSWORD=your-nsdl-password
RPA_UTIITSL_USERNAME=your-utiitsl-username
RPA_UTIITSL_PASSWORD=your-utiitsl-password
RPA_HEADLESS=true

# Push Notification Configuration
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_SUBJECT=mailto:your-email@domain.com

# UPI Configuration
UPI_MERCHANT_ID=your-upi-merchant-id
UPI_MERCHANT_NAME=PAN Seva Pro
UPI_TRANSACTION_NOTE=PAN Application Fee

# Audit & Compliance
AUDIT_LOG_RETENTION_DAYS=2555
AUDIT_LOG_ENCRYPTION=true

# Performance & Monitoring
ENABLE_PERFORMANCE_MONITORING=true
SENTRY_DSN=your-sentry-dsn-here

# Redis Configuration (for caching)
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads

# Payment Gateway Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### Installation Steps

1. **Clone and Install Dependencies**:
   ```bash
   git clone <repository-url>
   cd pan-seva-pro
   npm run install:all
   ```

2. **Setup Database**:
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Start Redis (if using caching)
   redis-server
   ```

3. **Configure Microsoft Azure**:
   - Create an Azure App Registration
   - Configure OneDrive API permissions
   - Add redirect URIs
   - Generate client secret

4. **Setup Twilio**:
   - Create Twilio account
   - Get Account SID and Auth Token
   - Purchase phone number
   - Configure webhooks

5. **Setup OpenAI**:
   - Get OpenAI API key
   - Enable GPT-4o-mini access
   - Configure usage limits

6. **Setup n8n Workflow**:
   - Deploy n8n instance
   - Import voice call workflow
   - Configure webhook endpoints

7. **Generate Encryption Keys**:
   ```bash
   # Generate 32-byte encryption key
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

8. **Start Development Servers**:
   ```bash
   # Start both frontend and backend
   npm run start:full
   
   # Or start separately
   npm run backend  # Backend on port 3001
   npm run dev      # Frontend on port 5173
   ```

## 🚀 Enhanced Deployment

### Production Deployment Checklist

#### 1. Environment Configuration
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up Redis for caching
- [ ] Configure production domains
- [ ] Set up SSL certificates

#### 2. Security Configuration
- [ ] Generate strong encryption keys
- [ ] Configure CORS for production domains
- [ ] Set up rate limiting
- [ ] Configure Helmet security headers
- [ ] Enable audit logging

#### 3. Cloud Services Setup
- [ ] Configure Azure App Registration for production
- [ ] Set up production Twilio account
- [ ] Configure OpenAI API limits
- [ ] Deploy n8n workflows
- [ ] Set up monitoring and alerts

#### 4. Database Setup
- [ ] Configure MongoDB Atlas cluster
- [ ] Set up database indexes
- [ ] Configure backup policies
- [ ] Set up monitoring

#### 5. CDN and Performance
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Configure service worker

#### 6. Monitoring and Logging
- [ ] Set up error tracking (Sentry)
- [ ] Configure performance monitoring
- [ ] Set up log aggregation
- [ ] Configure health checks

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm run install:all

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "run", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/pan-seva
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

### Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pan-seva-pro
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pan-seva-pro
  template:
    metadata:
      labels:
        app: pan-seva-pro
    spec:
      containers:
      - name: pan-seva-pro
        image: pan-seva-pro:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: pan-seva-secrets
              key: mongodb-uri
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: pan-seva-service
spec:
  selector:
    app: pan-seva-pro
  ports:
  - port: 80
    targetPort: 3001
  type: LoadBalancer
```

## 🧪 Enhanced Testing

### Frontend Testing
```bash
# Unit tests
npm run test

# E2E tests with accessibility checks
npm run test:e2e

# Accessibility testing
npm run test:a11y

# Performance testing
npm run test:perf
```

### Backend Testing
```bash
cd backend

# Unit tests
npm run test

# Integration tests
npm run test:integration

# Load testing
npm run test:load

# Security testing
npm run test:security
```

### Voice Testing
1. Enable microphone permissions
2. Test in Chrome/Edge (best Web Speech API support)
3. Use clear speech in quiet environment
4. Try different languages and accents
5. Test voice call workflows with n8n

### Accessibility Testing
1. Test with screen readers (NVDA, JAWS, VoiceOver)
2. Navigate using only keyboard
3. Test high contrast mode
4. Verify ARIA labels and roles
5. Test with different font sizes

## 🔒 Enhanced Security Features

### Data Protection
- **End-to-End Encryption**: All sensitive data encrypted client-side
- **Zero-Knowledge Architecture**: Server never sees unencrypted data
- **Secure Key Management**: Client-side key generation and storage
- **Document Encryption**: Files encrypted before cloud storage

### API Security
- **Rate Limiting**: Prevents abuse of API endpoints
- **Input Validation**: Server-side validation of all inputs
- **SQL Injection Protection**: Parameterized queries and validation
- **XSS Protection**: Content Security Policy and input sanitization
- **CSRF Protection**: Token-based CSRF protection

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Admin and user role separation
- **Session Management**: Secure session handling
- **Multi-Factor Authentication**: OTP-based verification

### Infrastructure Security
- **HTTPS Enforcement**: All communications encrypted
- **Security Headers**: Comprehensive security headers
- **CORS Configuration**: Restricted cross-origin requests
- **File Upload Security**: Type and size restrictions

## 📊 Enhanced Performance

### Frontend Optimization
- **Code Splitting**: Lazy loading of components
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: WebP format and lazy loading
- **Service Worker**: Advanced caching strategies
- **Bundle Analysis**: Regular bundle size monitoring

### Backend Optimization
- **Database Indexing**: Optimized MongoDB indexes
- **Caching Strategy**: Redis caching for frequent queries
- **Connection Pooling**: Efficient database connections
- **Compression**: Gzip compression for responses
- **CDN Integration**: Static asset delivery optimization

### Performance Metrics
- **Lighthouse Score**: 95+ for Performance, Accessibility, SEO
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Voice Recognition Latency**: < 500ms
- **Document Upload**: Supports up to 5MB files

## 🌐 Enhanced Browser Support

### Recommended Browsers
- **Chrome 80+** (Best Web Speech API support)
- **Edge 80+** (Good Web Speech API support)
- **Firefox 70+** (Limited Web Speech API support)
- **Safari 14+** (Limited Web Speech API support)

### Mobile Support
- **Chrome Mobile** (Android)
- **Safari Mobile** (iOS - limited voice features)
- **Samsung Internet**
- **Firefox Mobile**

### PWA Support
- **Service Worker**: Advanced caching and offline functionality
- **Web App Manifest**: Full PWA configuration
- **Push Notifications**: Real-time updates
- **Offline Functionality**: Core features work offline

## 🤝 Enhanced Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow coding standards and accessibility guidelines
4. Add comprehensive tests
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Accessibility**: WCAG 2.2 Level AA compliance
- **Testing**: Minimum 80% code coverage
- **Documentation**: Comprehensive inline documentation

### Security Guidelines
- Never commit sensitive data or API keys
- Follow OWASP security guidelines
- Implement proper input validation
- Use secure coding practices
- Regular security audits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Enhanced Support

For support and questions:
- Create an issue on GitHub
- Email: support@panseva.pro
- Documentation: [docs.panseva.pro](https://docs.panseva.pro)
- Community Forum: [community.panseva.pro](https://community.panseva.pro)

## 🎯 Enhanced Roadmap

### Phase 1 (Current) ✅
- ✅ Voice-enabled PAN applications with 11 languages
- ✅ End-to-end encryption
- ✅ OneDrive cloud integration
- ✅ AI-powered document validation
- ✅ Automated RPA submission
- ✅ Real-time status tracking
- ✅ WCAG 2.2 Level AA compliance
- ✅ PWA with offline functionality
- ✅ Advanced payment system with UPI
- ✅ Comprehensive admin dashboard
- ✅ Audit logging and compliance

### Phase 2 (Q2 2025) 🔄
- 🔄 Blockchain-based document verification
- 🔄 Advanced biometric authentication
- 🔄 Machine learning fraud detection
- 🔄 Advanced analytics and reporting
- 🔄 Multi-tenant architecture
- 🔄 API marketplace integration

### Phase 3 (Q3 2025) 📋
- 📋 Integration with government APIs
- 📋 IoT device support
- 📋 Advanced AI chatbot
- 📋 Predictive analytics
- 📋 White-label solutions
- 📋 International expansion

### Phase 4 (Q4 2025) 🚀
- 🚀 Quantum-resistant encryption
- 🚀 AR/VR document capture
- 🚀 Advanced voice synthesis
- 🚀 Federated learning implementation
- 🚀 Edge computing optimization
- 🚀 Global compliance framework

---

**Made with ❤️ for Digital India Initiative**

*Empowering citizens with AI-powered, accessible, and secure government services.*
=======
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
>>>>>>> 89256d8307ba6b2cae997f6be01cd9c035cbd4fb
