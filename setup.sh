#!/bin/bash
# Memory Graph Dashboard Setup Script

echo "🧠 Setting up Memory Graph Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if memory graph data exists
MEMORY_DIR="../memory/graph"
if [ ! -d "$MEMORY_DIR" ]; then
    echo "⚠️  Memory graph directory not found at $MEMORY_DIR"
    echo "   Dashboard will use sample data for demonstration"
else
    echo "✅ Memory graph data found at $MEMORY_DIR"
fi

# Build the project to verify everything works
echo "🔧 Building dashboard..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo "✅ Build completed successfully"

# Instructions
echo ""
echo "🎉 Memory Graph Dashboard is ready!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "Happy memory exploring! 🧠✨"