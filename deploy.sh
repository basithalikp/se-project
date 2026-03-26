#!/bin/bash
# Smart Water System - DEPLOYMENT SCRIPT

echo ""
echo "=========================================="
echo "Smart Water System - Deploy"
echo "=========================================="
echo ""
echo "Step 1: Install Vercel CLI"
echo "Step 2: Deploy Frontend to Vercel"
echo "Step 3: Manual Backend Deploy on Render"
echo ""
read -p "Press Enter to continue..."

# Install Vercel CLI
echo ""
echo "Installing Vercel CLI..."
npm install -g vercel

# Deploy Frontend
echo ""
echo "=========================================="
echo "DEPLOYING FRONTEND TO VERCEL"
echo "=========================================="
echo ""
echo "This will open Vercel in your browser"
echo "Follow the prompts to deploy"
echo ""
read -p "Press Enter to continue..."

cd frontend
npm install
vercel --prod
cd ..

echo ""
echo "=========================================="
echo "FRONTEND DEPLOYED!"
echo "=========================================="
echo ""
echo "Save your Vercel URL from the output above"
echo ""
echo "Now for Backend, follow these steps:"
echo "1. Go to: https://render.com"
echo "2. Click 'New Web Service'"
echo "3. Connect GitHub repo: se-project"
echo "4. Set Root Directory: backend"
echo "5. Build Command: npm install"
echo "6. Start Command: node server.js"
echo "7. Add env vars: MONGODB_URI, JWT_SECRET"
echo "8. Click Deploy"
echo ""
echo "=========================================="
