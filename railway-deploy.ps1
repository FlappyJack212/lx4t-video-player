# Railway Deployment Script
Write-Host "🚀 Deploying LX4T Video Player to Railway..." -ForegroundColor Green
Write-Host ""

# Step 1: Login to Railway
Write-Host "Step 1: Login to Railway" -ForegroundColor Yellow
Write-Host "This will open your browser for authentication..." -ForegroundColor Cyan
Write-Host "Press Enter when ready to continue..."
Read-Host

# Run railway login in interactive mode
Start-Process -FilePath "railway" -ArgumentList "login" -Wait

# Check if login was successful
Write-Host ""
Write-Host "Checking login status..." -ForegroundColor Yellow
$loginCheck = & railway whoami 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully logged in!" -ForegroundColor Green
    Write-Host ""
    
    # Step 2: Initialize project
    Write-Host "Step 2: Creating Railway project" -ForegroundColor Yellow
    & railway init
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Project initialized!" -ForegroundColor Green
        Write-Host ""
        
        # Step 3: Deploy
        Write-Host "Step 3: Deploying to Railway" -ForegroundColor Yellow
        & railway up
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "🎉 SUCCESS! Your app is deployed!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Cyan
            Write-Host "1. Get your Railway URL from the output above" -ForegroundColor White
            Write-Host "2. Update script.js with your Railway URL" -ForegroundColor White
            Write-Host "3. Push the update to GitHub" -ForegroundColor White
        } else {
            Write-Host "❌ Railway deploy failed" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Railway init failed" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Railway login failed" -ForegroundColor Red
    Write-Host "Please try running 'railway login' manually" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
