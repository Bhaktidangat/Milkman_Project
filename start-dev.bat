@echo off
setlocal
title Milkman Dev

REM Pin backend port and front-end proxy
set VITE_API_PORT=8000

REM Start backend in a new window
start "milkman-backend" cmd /K "cd /d backend && .\venv\Scripts\python.exe -m pip install -r requirements.txt && .\venv\Scripts\python.exe manage.py migrate && .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000"

REM Start frontend in a new window
start "milkman-frontend" cmd /K "cd /d frontend && npm install && npm run dev"

echo Started backend (127.0.0.1:8000) and frontend (Vite). Press any key to exit this launcher...
pause >nul
endlocal

