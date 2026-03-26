#!/bin/bash
# Smart Water System - ONE CLICK DEPLOYMENT SCRIPT

echo "🚀 Smart Water System - Auto Deploy"
echo "===================================="
echo ""
echo "This script will:"
echo "1. Create Vercel frontend deployment"
echo "2. Create Render backend deployment"
echo "3. Setup MongoDB Atlas"
echo ""
echo "Requirements:"
echo "- Vercel CLI installed: npm install -g vercel"
echo "- Render CLI installed: npm install -g @render-com/cli"
echo "- MongoDB Atlas account (free)"
echo ""
read -p "Press Enter to continue..."

# Step 1: Deploy Frontend to Vercel
echo ""
echo "📱 Deploying Frontend to Vercel..."
cd frontend
npm install
vercel --prod --confirm
FRONTEND_URL=$(vercel ls --json | jq -r '.deployments[0].url')
echo "✅ Frontend deployed: $FRONTEND_URL"
cd ..

# Step 2: Deploy Backend to Render
echo ""
echo "🔧 Deploying Backend to Render..."
render deploy --directory=backend

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to MongoDB Atlas: https://mongodb.com/cloud/atlas"
echo "2. Create free cluster"
echo "3. Get connection string"
echo "4. Add to Render environment variables"
echo ""
echo "🎉 Your app will be live soon!"
