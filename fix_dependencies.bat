@echo off
echo ================================================
echo    Fixing Dependencies - PA System
echo ================================================
echo.

REM Activate virtual environment
if exist venv (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo ERROR: Virtual environment not found!
    echo Please run 'run.bat' first to create it.
    pause
    exit /b 1
)

echo.
echo Uninstalling conflicting packages...
pip uninstall -y flask-socketio python-socketio python-engineio eventlet

echo.
echo Upgrading pip...
python -m pip install --upgrade pip

echo.
echo Installing correct versions...
pip install Flask==3.0.0
pip install python-engineio==4.9.0
pip install python-socketio==5.11.0
pip install flask-socketio==5.3.6
pip install flask-cors==4.0.0
pip install eventlet==0.35.2

echo.
echo Installing other dependencies...
pip install googletrans==4.0.0rc1
pip install gTTS==2.5.3
pip install qrcode==7.4.2
pip install Pillow==10.1.0

echo.
echo ================================================
echo    Dependencies Fixed Successfully!
echo ================================================
echo.
echo You can now run: python app.py
echo.
pause
