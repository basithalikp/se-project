@echo off
REM Smart Water System - ONE CLICK DEPLOYMENT (Windows)

echo.
echo ============================================
echo Smart Water System - Auto Deploy
echo ============================================
echo.
echo Step 1: Install Vercel CLI
echo Step 2: Deploy Frontend
echo Step 3: Manual Backend Deploy on Render
echo.
pause

REM Install Vercel CLI
echo Installing Vercel CLI...
npm install -g vercel

REM Deploy Frontend
echo.
echo ============================================
echo DEPLOYING FRONTEND TO VERCEL
echo ============================================
echo.
echo This will open Vercel in your browser
echo Follow the prompts to deploy
echo.
pause

cd frontend
npm install
call vercel --prod
cd ..

echo.
echo ============================================
echo FRONTEND DEPLOYED!
echo ============================================
echo.
echo Save your Vercel URL from the output above
echo.
echo Now for Backend, follow these steps:
echo 1. Go to: https://render.com
echo 2. Click "New Web Service"
echo 3. Connect GitHub repo: se-project
echo 4. Set Root Directory: backend
echo 5. Build Command: npm install
echo 6. Start Command: node server.js
echo 7. Add env vars: MONGODB_URI, JWT_SECRET
echo 8. Click Deploy
echo.
pause
