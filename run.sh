#!/bin/bash

echo "================================================"
echo "   Multi-Language PA System - Quick Start"
echo "================================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to create virtual environment"
        echo "Please ensure Python 3 is installed"
        exit 1
    fi
    echo "Virtual environment created successfully!"
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to activate virtual environment"
    exit 1
fi

# Check if dependencies are installed
echo "Checking dependencies..."
python -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies"
        exit 1
    fi
    echo "Dependencies installed successfully!"
    echo ""
fi

# Run the application
echo ""
echo "================================================"
echo "   Starting PA System..."
echo "================================================"
echo ""
echo "Access points:"
echo "- Home:    http://localhost:5000"
echo "- Admin:   http://localhost:5000/admin"
echo "- Client:  http://localhost:5000/client"
echo "- History: http://localhost:5000/history"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

python app.py
