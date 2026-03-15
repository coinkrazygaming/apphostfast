#!/bin/bash

set -e

echo "🚀 AppHostFast Setup Script"
echo "============================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20 or higher."
    exit 1
fi

echo "✓ Node.js $(node -v) detected"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✓ pnpm $(pnpm -v) detected"

# Copy environment file
if [ ! -f ".env.local" ]; then
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Update .env.local with your GitHub OAuth credentials"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check Docker
if command -v docker &> /dev/null; then
    echo "✓ Docker detected"
    
    # Check Docker Compose
    if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
        echo "✓ Docker Compose detected"
        echo ""
        echo "🐳 Starting services with Docker Compose..."
        docker-compose up -d
        
        echo ""
        echo "✅ Setup complete!"
        echo ""
        echo "Services running:"
        echo "  - Frontend: http://localhost:3000"
        echo "  - API: http://localhost:3000/api"
        echo "  - Database: localhost:5432"
        echo "  - Redis: localhost:6379"
        echo "  - Traefik Dashboard: http://localhost:8080"
        echo ""
        echo "To stop services: docker-compose down"
        echo "To view logs: docker-compose logs -f"
    else
        echo "⚠️  Docker Compose not found. Please install it or run:"
        echo "   docker-compose up"
    fi
else
    echo "⚠️  Docker not detected. Running without database services..."
    echo ""
    echo "To start development server:"
    echo "  pnpm dev"
    echo ""
    echo "Install Docker for full local setup with database and Redis"
fi

echo ""
echo "📚 Documentation: https://github.com/yourusername/apphostfast"
echo "💬 Support: support@apphostfast.dev"
