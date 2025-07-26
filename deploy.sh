#!/bin/bash

echo "🚀 Starting PAN Seva Pro Enhanced Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Install dependencies
print_status "Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install frontend dependencies"
    exit 1
fi

print_success "Frontend dependencies installed"

print_status "Installing backend dependencies..."
cd backend
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install backend dependencies"
    exit 1
fi

print_success "Backend dependencies installed"
cd ..

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    print_warning "Backend .env file not found. Creating from example..."
    cp backend/.env.example backend/.env
    print_warning "Please configure your environment variables in backend/.env"
fi

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is running"
    else
        print_warning "MongoDB is not running. You may need to start it manually."
    fi
else
    print_warning "MongoDB not found locally. Make sure to configure MONGODB_URI in .env"
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p backend/logs
mkdir -p backend/uploads
mkdir -p public/icons

print_success "Directories created"

# Generate a sample encryption key
print_status "Generating sample encryption key..."
ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
echo "Sample encryption key generated: $ENCRYPTION_KEY"
print_warning "Please add this to your backend/.env file as ENCRYPTION_KEY"

# Check if all required services are configured
print_status "Checking configuration..."

if [ -f "backend/.env" ]; then
    if grep -q "MONGODB_URI=" backend/.env && grep -q "JWT_SECRET=" backend/.env; then
        print_success "Basic configuration found"
    else
        print_warning "Please configure MONGODB_URI and JWT_SECRET in backend/.env"
    fi
else
    print_error "Backend .env file is missing"
fi

# Build frontend for production (optional)
read -p "Do you want to build the frontend for production? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Building frontend for production..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend built successfully"
    else
        print_error "Frontend build failed"
    fi
fi

# Final instructions
echo
echo "🎉 Deployment preparation complete!"
echo
echo "Next steps:"
echo "1. Configure your environment variables in backend/.env"
echo "2. Set up your database (MongoDB)"
echo "3. Configure external services (Twilio, OpenAI, Azure, etc.)"
echo "4. Start the development servers:"
echo "   - Frontend: npm run dev"
echo "   - Backend: npm run backend"
echo "   - Both: npm run start:full"
echo
echo "For production deployment:"
echo "1. Set NODE_ENV=production in backend/.env"
echo "2. Configure production database and services"
echo "3. Use a process manager like PM2"
echo "4. Set up reverse proxy (nginx)"
echo "5. Configure SSL certificates"
echo
echo "📚 Check README.md for detailed configuration instructions"
echo

print_success "Ready to launch! 🚀"