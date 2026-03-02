@echo off
REM GuardLY Document Privacy Scanner - Setup Script (Windows)

setlocal enabledelayedexpansion

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  GuardLY Document Privacy Scanner - Setup Script         ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check Node.js installation
echo 📋 Checking prerequisites...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% found

REM Create directories
echo.
echo 📁 Creating directories...
if not exist uploads mkdir uploads
echo ✅ Created 'uploads' directory

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
echo.
echo ⚙️  Configuring environment...
if not exist .env (
    copy .env.example .env >nul
    echo ✅ Created .env file
) else (
    echo ✅ .env file already exists
)

REM Verify file structure
echo.
echo 📂 Verifying project structure...

setlocal enabledelayedexpansion

set "files[0]=src\server.js"
set "files[1]=src\modules\textExtractor.js"
set "files[2]=src\modules\entityDetector.js"
set "files[3]=src\modules\userMatcher.js"
set "files[4]=src\modules\riskCalculator.js"
set "files[5]=src\modules\documentScannerService.js"
set "files[6]=package.json"
set "files[7]=README.md"

for /L %%A in (0,1,7) do (
    if exist "!files[%%A]!" (
        echo ✅ !files[%%A]!
    ) else (
        echo ❌ !files[%%A]! - MISSING
    )
)

REM Success message
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                   ✅ Setup Complete!                      ║
echo ╠═══════════════════════════════════════════════════════════╣
echo ║                                                           ║
echo ║  Next Steps:                                             ║
echo ║  1. Start the server:                                    ║
echo ║     npm start        ^(production^)                        ║
echo ║     npm run dev      ^(development^)                       ║
echo ║                                                           ║
echo ║  2. Test the API:                                        ║
echo ║     curl http://localhost:3001/api/health               ║
echo ║                                                           ║
echo ║  3. Read documentation:                                  ║
echo ║     • README.md - Full documentation                     ║
echo ║     • QUICKSTART.md - Quick start guide                  ║
echo ║     • API_DOCUMENTATION.md - API reference               ║
echo ║     • TESTING.md - Test cases                            ║
echo ║                                                           ║
echo ║  API Endpoint:                                           ║
echo ║     http://localhost:3001/api                            ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
pause
