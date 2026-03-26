@echo off
title Smart Water System - Running Servers
cd /d d:\SmartWaterSystem

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     Smart Water System - Dual Server Launcher              ║
echo ║     Version 2.0 - Purple Grapefruit Theme                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🔧 Starting Backend Server (Port 5000)...
echo 🎨 Starting Frontend Server (Port 3000)...
echo.
echo 📊 Dashboard: http://localhost:3000
echo 🔌 API: http://localhost:5000
echo.
echo 🍇 Theme: Juicy Purple Grapefruit
echo 💜 Decimals: Optimized (1-2 places)
echo ✨ Legend: Visible at bottom
echo.

REM Start backend in a new window with title
start "Backend Server - SmartWater (Port 5000)" cmd /k "cd backend && npm start"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start frontend in a new window with title
start "Frontend Server - SmartWater (Port 3000)" cmd /k "cd frontend && npm start"

echo ✅ Both servers starting...
echo ⏳ Waiting for servers to boot (this takes ~30 seconds)...
echo.
echo 📌 REMEMBER:
echo    - Backend window title: "Backend Server - SmartWater (Port 5000)"
echo    - Frontend window title: "Frontend Server - SmartWater (Port 3000)"
echo    - Close BOTH windows to stop all servers
echo    - Or use Ctrl+C in either window to stop that server
echo.
timeout /t 10

echo.
echo 🚀 Servers should be running now!
echo 💻 Open browser and go to: http://localhost:3000
echo 🔐 Login with: bensen@farm.com / password123
echo.
pause
