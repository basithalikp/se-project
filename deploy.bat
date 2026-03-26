@echo off
REM Smart Water System - ONE CLICK DEPLOYMENT (Windows)

echo.
echo ============================================
echo Smart Water System - Auto Deploy
echo ============================================
echo.
echo This will deploy your app to Vercel + Render
echo.
pause

REM Install global tools if needed
echo Installing deployment tools...
npm install -g vercel @render-com/cli

REM Deploy Frontend
echo.
echo Deploying Frontend to Vercel...
cd frontend
npm install
call vercel --prod --confirm
cd ..

REM Deploy Backend
echo.
echo Deploying Backend to Render...
cd backend
npm install
call render deploy
cd ..

echo.
echo ============================================
echo DEPLOYMENT STARTED!
echo ============================================
echo.
echo Next: Add MongoDB connection string to Render
echo Dashboard: https://dashboard.render.com
echo.
pause
