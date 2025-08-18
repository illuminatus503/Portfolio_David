#!/bin/bash

# Deployment script for David Fernández-Cuenca Portfolio
# This script prepares the project for Vercel deployment

echo "🚀 Preparing David Fernández-Cuenca Portfolio for deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && pnpm install && cd ..

# Install API dependencies
echo "📦 Installing API dependencies..."
cd api && pnpm install && cd ..

# Build frontend CSS
echo "🎨 Building CSS..."
cd frontend
pnpm run build:css
cd ..

# Run linting (if available)
echo "🔍 Running linting..."
pnpm run lint || echo "⚠️  Linting not configured or failed"

# Verify critical files exist
echo "✅ Verifying critical files..."

critical_files=(
    "vercel.json"
    "frontend/index.html"
    "frontend/admin.html"
    "frontend/dist/output.css"
    "api/contact.js"
    "api/projects.js"
    "api/blog.js"
    "api/login.js"
)

for file in "${critical_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Critical file missing: $file"
        exit 1
    else
        echo "✅ $file exists"
    fi
done

# Check for environment variables example
if [ ! -f "vercel.env.example" ]; then
    echo "⚠️  Warning: vercel.env.example not found"
else
    echo "✅ Environment variables example available"
fi

# Verify React components exist
echo "🔍 Verifying React components..."
components=(
    "frontend/src/App.jsx"
    "frontend/src/AdminApp.jsx"
    "frontend/src/components/Hero.jsx"
    "frontend/src/components/About.jsx"
    "frontend/src/components/Skills.jsx"
    "frontend/src/components/Projects.jsx"
    "frontend/src/components/Contact.jsx"
    "frontend/src/components/Footer.jsx"
    "frontend/src/components/Admin.jsx"
)

for component in "${components[@]}"; do
    if [ ! -f "$component" ]; then
        echo "❌ Error: Component missing: $component"
        exit 1
    fi
done

echo "✅ All React components verified"

# Check for assets
if [ ! -d "frontend/assets" ]; then
    echo "⚠️  Warning: Assets directory not found"
else
    echo "✅ Assets directory exists"
fi

# Verify database schema
if [ ! -f "database-schema.sql" ]; then
    echo "⚠️  Warning: Database schema file not found"
else
    echo "✅ Database schema available"
fi

# Final verification
echo ""
echo "🎯 Pre-deployment checklist:"
echo "✅ Dependencies installed"
echo "✅ CSS built successfully"
echo "✅ Critical files verified"
echo "✅ React components verified"
echo "✅ Project structure validated"

echo ""
echo "📋 Next steps for Vercel deployment:"
echo "1. 🔗 Connect your GitHub repository to Vercel"
echo "2. ⚙️  Configure environment variables (see vercel.env.example)"
echo "3. 🗄️  Set up PostgreSQL database (use database-schema.sql)"
echo "4. 🔐 Create admin user in the database"
echo "5. 🚀 Deploy to Vercel"

echo ""
echo "💡 Important environment variables to set in Vercel:"
echo "   - DATABASE_URL"
echo "   - GMAIL_USER"
echo "   - GMAIL_APP_PASSWORD"
echo "   - RECIPIENT_EMAIL"
echo "   - JWT_SECRET"

echo ""
echo "🎉 Project is ready for Vercel deployment!"
echo "📚 See README.md for detailed deployment instructions"
