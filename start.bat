@echo off
echo.
echo ========================================
echo   LX4T Video Player - Quick Start
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    call npm install
    echo.
) else (
    echo [1/2] Dependencies already installed!
    echo.
)

echo [2/2] Starting server...
echo.
echo ========================================
echo   Server will start on port 3001
echo   Open: http://localhost:3001
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

