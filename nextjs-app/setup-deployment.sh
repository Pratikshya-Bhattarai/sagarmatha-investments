#!/bin/bash

# 🚀 Sagarmatha Deployment Setup Script
echo "🚀 Setting up Sagarmatha deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Deployment Setup Checklist${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Please run this script from the nextjs-app directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found Next.js project${NC}"

# Step 1: Update environment variables
echo ""
echo -e "${YELLOW}📝 Step 1: Configure Environment Variables${NC}"
echo "Please update your .env.local file with your backend URL:"
echo ""
echo "NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cat > .env.local << EOF
# Backend API URL (update with your deployed backend URL)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Supabase Configuration (optional)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
EOF
    echo -e "${GREEN}✅ Created .env.local file${NC}"
else
    echo -e "${GREEN}✅ .env.local file exists${NC}"
fi

# Step 2: Test backend connection
echo ""
echo -e "${YELLOW}🧪 Step 2: Test Backend Connection${NC}"
echo "Testing backend connection..."

# Run the test script
if [ -f "test-backend.js" ]; then
    node test-backend.js
else
    echo -e "${RED}❌ test-backend.js not found${NC}"
fi

# Step 3: Install dependencies
echo ""
echo -e "${YELLOW}📦 Step 3: Install Dependencies${NC}"
echo "Installing frontend dependencies..."
npm install

# Step 4: Build and test
echo ""
echo -e "${YELLOW}🔨 Step 4: Build and Test${NC}"
echo "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Step 5: Start development server
echo ""
echo -e "${YELLOW}🚀 Step 5: Start Development Server${NC}"
echo "Starting development server..."
echo "Your application will be available at: http://localhost:3000"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Deploy your backend to PythonAnywhere, Railway, or Heroku"
echo "2. Update NEXT_PUBLIC_API_URL in .env.local with your backend URL"
echo "3. Test the complete integration"
echo "4. Deploy frontend to Vercel"
echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "To start the development server, run:"
echo "npm run dev"
