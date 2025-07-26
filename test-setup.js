#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🧪 Testing PAN Seva Pro Enhanced Setup...\n');

// Test results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function test(description, condition, isWarning = false) {
  if (condition) {
    console.log(`✅ ${description}`);
    results.passed++;
  } else {
    if (isWarning) {
      console.log(`⚠️  ${description}`);
      results.warnings++;
    } else {
      console.log(`❌ ${description}`);
      results.failed++;
    }
  }
}

// Test Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
test(`Node.js version ${nodeVersion} (requires 18+)`, majorVersion >= 18);

// Test package.json files
test('Frontend package.json exists', fs.existsSync('package.json'));
test('Backend package.json exists', fs.existsSync('backend/package.json'));

// Test node_modules
test('Frontend node_modules exists', fs.existsSync('node_modules'));
test('Backend node_modules exists', fs.existsSync('backend/node_modules'));

// Test environment configuration
test('Backend .env.example exists', fs.existsSync('backend/.env.example'));
test('Backend .env exists', fs.existsSync('backend/.env'), true);

// Test key directories
test('Backend services directory exists', fs.existsSync('backend/services'));
test('Backend routes directory exists', fs.existsSync('backend/routes'));
test('Backend models directory exists', fs.existsSync('backend/models'));
test('Frontend services directory exists', fs.existsSync('src/services'));
test('Frontend components directory exists', fs.existsSync('src/components'));

// Test key files
const keyFiles = [
  'backend/services/encryptionService.js',
  'backend/services/oneDriveService.js',
  'backend/services/voiceCallService.js',
  'backend/services/rpaService.js',
  'backend/services/auditService.js',
  'backend/services/notificationService.js',
  'backend/services/cronService.js',
  'backend/services/upiService.js',
  'src/services/clientEncryptionService.ts',
  'src/services/accessibilityService.ts',
  'src/services/i18nService.ts',
  'src/services/lottieService.ts',
  'backend/routes/voice.js',
  'backend/routes/upi.js',
  'backend/routes/admin.js',
  'backend/middleware/auth.js',
  'backend/middleware/adminAuth.js',
  'public/sw.js',
  'public/manifest.json',
  'public/offline.html'
];

keyFiles.forEach(file => {
  test(`${file} exists`, fs.existsSync(file));
});

// Test UI components
const uiComponents = [
  'src/components/ui/badge.tsx',
  'src/components/ui/progress.tsx',
  'src/components/ui/alert.tsx',
  'src/lib/utils.ts'
];

uiComponents.forEach(component => {
  test(`${component} exists`, fs.existsSync(component));
});

// Test enhanced component
test('Enhanced PAN Application component exists', fs.existsSync('src/components/EnhancedPANApplication.tsx'));

// Check if MongoDB is available (warning only)
try {
  await import('mongodb');
  test('MongoDB driver available', true);
} catch (e) {
  test('MongoDB driver available', false, true);
}

// Check critical dependencies
const frontendPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const backendPackage = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

// Frontend dependencies
const frontendDeps = [
  'crypto-js',
  'i18next',
  'react-i18next',
  'lottie-react',
  'qrcode',
  'workbox-precaching'
];

frontendDeps.forEach(dep => {
  test(`Frontend dependency: ${dep}`, frontendPackage.dependencies[dep] !== undefined);
});

// Backend dependencies
const backendDeps = [
  '@azure/msal-node',
  '@microsoft/microsoft-graph-client',
  'archiver',
  'axios',
  'node-cron',
  'openai',
  'puppeteer',
  'qrcode',
  'web-push',
  'winston'
];

backendDeps.forEach(dep => {
  test(`Backend dependency: ${dep}`, backendPackage.dependencies[dep] !== undefined);
});

// Test scripts
test('Frontend start:full script exists', frontendPackage.scripts['start:full'] !== undefined);
test('Frontend install:all script exists', frontendPackage.scripts['install:all'] !== undefined);

console.log('\n📊 Test Results:');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`⚠️  Warnings: ${results.warnings}`);

if (results.failed === 0) {
  console.log('\n🎉 All critical tests passed! Your setup looks good.');
  console.log('\n📋 Next steps:');
  console.log('1. Configure backend/.env with your settings');
  console.log('2. Start MongoDB if using locally');
  console.log('3. Run: npm run start:full');
  console.log('4. Visit: http://localhost:5173');
} else {
  console.log('\n⚠️  Some tests failed. Please check the issues above.');
  console.log('Run: npm run install:all to install missing dependencies');
}

if (results.warnings > 0) {
  console.log('\n💡 Warnings are optional features that can be configured later.');
}

console.log('\n📚 Check QUICKSTART.md for detailed setup instructions.');