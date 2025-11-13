@echo off
chcp 65001 >nul
echo ================================================
echo    Multi-Language PA System - Quick Start
echo ================================================
echo.

REM Check if virtual environment exists
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        echo Please ensure Python is installed and added to PATH
        pause
        exit /b 1
    )
    echo Virtual environment created successfully!
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)

REM Check if dependencies are installed
echo Checking dependencies...
python -c "import flask" 2>nul
if errorlevel 1 (
    echo Installing dependencies...
    pip install --upgrade pip
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
) else (
    echo Dependencies already installed. Checking for updates...
    pip install --upgrade -r requirements.txt --quiet
)

REM Run the application
echo.
echo ================================================
echo    Starting PA System...
echo ================================================
echo.
echo Access points:
echo - Home:    http://localhost:5000
echo - Admin:   http://localhost:5000/admin
echo - Client:  http://localhost:5000/client
echo - History: http://localhost:5000/history
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

python app.py

REM If server exits, wait for user input
pause
