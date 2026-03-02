#!/bin/bash

# GuardLY Document Privacy Scanner - Setup Script
# This script sets up the development environment

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  GuardLY Document Privacy Scanner - Setup Script         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js installation
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm $NPM_VERSION found"

# Create directories
echo ""
echo "📁 Creating directories..."
mkdir -p uploads
echo "✅ Created 'uploads' directory"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
echo ""
echo "⚙️  Configuring environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

# Verify file structure
echo ""
echo "📂 Verifying project structure..."
FILES=(
    "src/server.js"
    "src/modules/textExtractor.js"
    "src/modules/entityDetector.js"
    "src/modules/userMatcher.js"
    "src/modules/riskCalculator.js"
    "src/modules/documentScannerService.js"
    "package.json"
    "README.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
    fi
done

# Success message
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                   ✅ Setup Complete!                      ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║                                                           ║"
echo "║  Next Steps:                                             ║"
echo "║  1. Start the server:                                    ║"
echo "║     npm start        (production)                        ║"
echo "║     npm run dev      (development)                       ║"
echo "║                                                           ║"
echo "║  2. Test the API:                                        ║"
echo "║     curl http://localhost:3001/api/health               ║"
echo "║                                                           ║"
echo "║  3. Read documentation:                                  ║"
echo "║     • README.md - Full documentation                     ║"
echo "║     • QUICKSTART.md - Quick start guide                  ║"
echo "║     • API_DOCUMENTATION.md - API reference               ║"
echo "║     • TESTING.md - Test cases                            ║"
echo "║                                                           ║"
echo "║  API Endpoint:                                           ║"
echo "║     http://localhost:3001/api                            ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
