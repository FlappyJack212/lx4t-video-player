@echo off
echo.
echo ========================================
echo   LX4T Video Player - Deploy Script
echo ========================================
echo.

echo This script will help you deploy to GitHub and Heroku
echo.
pause

echo.
echo [Step 1/5] Checking Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo Git is installed!

echo.
echo [Step 2/5] Initializing Git repository...
if not exist ".git\" (
    git init
    echo Git repository initialized!
) else (
    echo Git repository already exists!
)

echo.
echo [Step 3/5] Adding files to Git...
git add .
git commit -m "🎉 LX4T Video Player - 60+ features with Watch Parties"
echo Files committed!

echo.
echo ========================================
echo   GITHUB SETUP
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a repository named: lx4t-video-player
echo 3. Copy the repository URL
echo.
echo Example: https://github.com/YOUR_USERNAME/lx4t-video-player.git
echo.
set /p REPO_URL="Paste your GitHub repository URL here: "

if "%REPO_URL%"=="" (
    echo No URL provided. Skipping GitHub...
) else (
    echo.
    echo Adding GitHub remote...
    git remote add origin %REPO_URL% 2>nul
    if errorlevel 1 (
        echo Remote already exists, updating...
        git remote set-url origin %REPO_URL%
    )
    
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    if errorlevel 1 (
        echo Trying 'master' branch...
        git push -u origin master
    )
    echo.
    echo ✅ Pushed to GitHub!
)

echo.
echo ========================================
echo   HEROKU SETUP
echo ========================================
echo.
echo [Step 4/5] Checking Heroku CLI...
heroku --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo Heroku CLI is not installed!
    echo.
    echo Please install Heroku CLI:
    echo 1. Go to: https://devcenter.heroku.com/articles/heroku-cli
    echo 2. Download and install
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)
echo Heroku CLI is installed!

echo.
echo Logging in to Heroku...
echo (A browser window will open)
heroku login
if errorlevel 1 (
    echo Login failed!
    pause
    exit /b 1
)

echo.
echo [Step 5/5] Creating Heroku app...
echo.
set /p APP_NAME="Enter Heroku app name (or leave blank for random): "

if "%APP_NAME%"=="" (
    heroku create
) else (
    heroku create %APP_NAME%
)

echo.
echo Deploying to Heroku...
git push heroku main 2>nul
if errorlevel 1 (
    echo Trying 'master' branch...
    git push heroku master
)

echo.
echo ========================================
echo   ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your app is now live!
echo.
echo Opening your app in browser...
heroku open

echo.
echo ⚠️  IMPORTANT: Update Socket URL!
echo.
echo Open script.js and change line ~311:
echo   const SOCKET_URL = 'http://localhost:3001';
echo To your Heroku URL (shown above)
echo.
echo Then run:
echo   git add script.js
echo   git commit -m "Update Socket URL"
echo   git push heroku main
echo.
pause

