# 🔧 Deploy Backend to Render

## Step 1: Go to Render
👉 https://render.com

## Step 2: Click "New +" → "Web Service"

## Step 3: Connect GitHub
- Click "Connect GitHub"
- Authorize Render
- Select repository: `Bensen8806/se-project`

## Step 4: Configure Service

Fill in these fields:

```
Name: smartwater-backend
Environment: Node
Region: Oregon (or closest to you)
Root Directory: backend
Build Command: npm install
Start Command: node server.js
Plan: Free
```

## Step 5: Add Environment Variables

Click "Advanced" then "Add Environment Variable"

Add these:

```
MONGODB_URI = (will get this in step 6)
JWT_SECRET = your-secret-key-here
NODE_ENV = production
```

For now, use dummy values. We'll update after getting MongoDB.

## Step 6: Create Free MongoDB Database

1. Go to: https://mongodb.com/cloud/atlas
2. Create account (if needed)
3. Click "Create a Deployment"
4. Select "M0 (Free)" tier
5. Choose region
6. Click "Create Deployment"
7. Wait for cluster to build
8. Click "Databases" → "Connect"
9. Click "Drivers"
10. Copy the connection string
11. Looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

## Step 7: Update Render Environment Variables

1. Go back to Render dashboard
2. Find your `smartwater-backend` service
3. Click "Environment"
4. Update `MONGODB_URI` with the string from step 6
5. Save

## Step 8: Deploy

Back in Render service creation page, click "Create Web Service"

Wait 2-3 minutes for deployment...

## ✅ Done!

Your backend will be live at something like:
```
https://smartwater-backend.onrender.com
```

Save this URL!

---

## Next: Update Frontend

The frontend needs to know your backend URL.

1. Go to GitHub: https://github.com/Bensen8806/se-project
2. Open `frontend/src/api.js`
3. Find where it says `localhost:5000` or similar
4. Replace with your Render backend URL
5. Commit and push

Vercel will auto-redeploy! ✅
