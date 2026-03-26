# 🚀 BACKEND DEPLOYMENT - READY TO DEPLOY

Your MongoDB connection string is configured!

## **NOW GO TO RENDER AND CREATE BACKEND SERVICE:**

1. Go to: https://render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"**
4. Select repository: `Bensen8806/se-project`

## **Fill in these details:**

```
Name: smartwater-backend
Environment: Node
Region: Oregon (US East)
Root Directory: backend
Build Command: npm install
Start Command: node server.js
Plan: Free
```

## **IMPORTANT: Add Environment Variables**

Click **"Advanced"** and add these exact variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://24b771:QHuTC8SIBSRyK4hd@cluster0.rwwoabv.mongodb.net/?appName=Cluster0` |
| `JWT_SECRET` | `smartwater-secret-key-2026` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

## **Click "Create Web Service"**

Wait 2-3 minutes for deployment...

---

## **✅ DONE!**

Your backend URL will be something like:
```
https://smartwater-backend.onrender.com
```

**Save this URL and tell me!**

Then I'll update your frontend to connect to it! 🎯
