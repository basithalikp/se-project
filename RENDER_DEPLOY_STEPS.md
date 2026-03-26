# 🚀 QUICK BACKEND DEPLOYMENT (Just 3 Steps!)

## Step 1: Create MongoDB Database (FREE) - 2 minutes

1. Go to: https://mongodb.com/cloud/atlas
2. Click "Create Account" (or login)
3. Click "Create a Deployment"
4. Select **"M0 (Free)" tier**
5. Choose region: **US East (Virginia)** (or closest to you)
6. Click "Create Deployment"
7. Wait for cluster to build (1-2 min)
8. Click "Database" in left menu
9. Click "Connect" button
10. Select "Drivers" tab
11. Copy the connection string that looks like:
    ```
    mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
    ```

**IMPORTANT:** Replace:
- `USERNAME` with your MongoDB username
- `PASSWORD` with your MongoDB password

Example:
```
mongodb+srv://admin:mypassword123@cluster0.abcd1234.mongodb.net/?retryWrites=true&w=majority
```

---

## Step 2: Go to Render and Create Backend Service

1. Go to: https://render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"**
4. Authorize Render to access GitHub
5. Select repository: `Bensen8806/se-project`
6. Click "Connect"

---

## Step 3: Configure and Deploy

Fill in these fields:

```
Name: smartwater-backend
Environment: Node
Region: Oregon (US East)
Root Directory: backend
Build Command: npm install
Start Command: node server.js
Plan: Free
```

Click **"Advanced"** and add Environment Variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Paste your MongoDB connection string from Step 1 |
| `JWT_SECRET` | `your-secret-key-12345` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

Then click **"Create Web Service"** and wait 2-3 minutes!

---

## ✅ Done!

Your backend URL will be something like:
```
https://smartwater-backend.onrender.com
```

Save this URL and tell me so I can update your frontend! 🎯
