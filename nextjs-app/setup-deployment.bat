@echo off
REM 🚀 Sagarmatha Deployment Setup Script for Windows

echo 🚀 Setting up Sagarmatha deployment...
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the nextjs-app directory
    pause
    exit /b 1
)

echo ✅ Found Next.js project

REM Step 1: Update environment variables
echo.
echo 📝 Step 1: Configure Environment Variables
echo Please update your .env.local file with your backend URL:
echo.
echo NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
echo.

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo # Backend API URL (update with your deployed backend URL^)
        echo NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
        echo.
        echo # Supabase Configuration (optional^)
        echo NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
    ) > .env.local
    echo ✅ Created .env.local file
) else (
    echo ✅ .env.local file exists
)

REM Step 2: Test backend connection
echo.
echo 🧪 Step 2: Test Backend Connection
echo Testing backend connection...

if exist "test-backend.js" (
    node test-backend.js
) else (
    echo ❌ test-backend.js not found
)

REM Step 3: Install dependencies
echo.
echo 📦 Step 3: Install Dependencies
echo Installing frontend dependencies...
npm install

REM Step 4: Build and test
echo.
echo 🔨 Step 4: Build and Test
echo Building the application...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful
) else (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Step 5: Display next steps
echo.
echo 🚀 Step 5: Next Steps
echo Your application is ready!
echo.
echo 📋 Next Steps:
echo 1. Deploy your backend to PythonAnywhere, Railway, or Heroku
echo 2. Update NEXT_PUBLIC_API_URL in .env.local with your backend URL
echo 3. Test the complete integration
echo 4. Deploy frontend to Vercel
echo.
echo 🎉 Setup complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
pause
