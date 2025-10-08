@echo off
echo 🚀 Deploying LX4T Video Player to Railway...
echo.

echo Step 1: Login to Railway
echo This will open your browser for authentication
railway login
if %errorlevel% neq 0 (
    echo ❌ Railway login failed
    pause
    exit /b %errorlevel%
)

echo.
echo Step 2: Creating Railway project
railway init
if %errorlevel% neq 0 (
    echo ❌ Railway init failed
    pause
    exit /b %errorlevel%
)

echo.
echo Step 3: Deploying to Railway
railway up
if %errorlevel% neq 0 (
    echo ❌ Railway deploy failed
    pause
    exit /b %errorlevel%
)

echo.
echo ✅ SUCCESS! Your app is deployed!
echo.
echo Next steps:
echo 1. Get your Railway URL from the output above
echo 2. Update script.js with your Railway URL
echo 3. Push the update to GitHub
echo.
pause
