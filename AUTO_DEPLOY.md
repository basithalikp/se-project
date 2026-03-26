# ⚡ ONE-CLICK AUTO DEPLOY

I've created scripts to deploy everything automatically! Follow these steps:

---

## **🪟 Windows Users:**

### Step 1: Install Required Tools (1 minute)
```powershell
npm install -g vercel @render-com/cli
```

### Step 2: Setup Accounts (3 minutes)
1. Create free Vercel account: https://vercel.com/signup
2. Create free Render account: https://render.com/i/smartwater
3. Create MongoDB Atlas account: https://mongodb.com/cloud/atlas

### Step 3: Run Deploy Script
```powershell
cd d:\SmartWaterSystem
.\deploy.bat
```

### Step 4: When Prompted
- Login to Vercel
- Login to Render
- Confirm deployments

**Done!** Your app is deployed! 🎉

---

## **🐧 Mac/Linux Users:**

### Step 1: Install Tools
```bash
npm install -g vercel @render-com/cli
```

### Step 2: Setup Accounts (same as above)

### Step 3: Run Deploy
```bash
cd /path/to/SmartWaterSystem
chmod +x deploy.sh
./deploy.sh
```

**Done!** ✅

---

## **After Deployment:**

1. **Get your Frontend URL** from Vercel dashboard
2. **Get your Backend URL** from Render dashboard
3. Go to MongoDB Atlas and create free database
4. Copy MongoDB connection string
5. Add to Render environment variables:
   ```
   MONGODB_URI = your_connection_string
   JWT_SECRET = your-secret-key
   ```

---

## **Share Your Live App!**
Once deployed, Vercel will give you a URL like:
```
https://smartwater-frontend.vercel.app
```

**Share this link with everyone!** 🌾💧

---

## **If Errors Occur:**

**Can't login to Vercel?**
```powershell
vercel login
```

**Can't login to Render?**
```powershell
render login
```

**Need to redeploy?**
```powershell
vercel --prod --confirm
render deploy
```

---

## **Manual Alternative (If Scripts Fail):**
Follow `DEPLOY_EASY.md` for step-by-step manual deployment (takes 5 minutes)
