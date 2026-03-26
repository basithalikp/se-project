# 🚀 HOW TO USE THE RUN SCRIPTS

## Quick Start Guide

### Windows Users (EASIEST!)

#### Step 1: Double-Click the Script
```
Navigate to: d:\SmartWaterSystem
Double-click: run.bat
```

**That's it!** Two new windows will open:
1. **Backend Server - SmartWater (Port 5000)**
2. **Frontend Server - SmartWater (Port 3000)**

#### Step 2: Wait for Servers to Boot
```
⏳ Takes ~30 seconds
Watch for: "Servers should be running now!"
```

#### Step 3: Open Browser
```
Go to: http://localhost:3000
```

#### Step 4: Login
```
Email:    bensen@farm.com
Password: password123
```

#### Step 5: Enjoy!
```
🍇 Purple Grapefruit Theme
✨ Border Glow Effects
💜 Optimized Decimals
```

---

## Stopping the Servers

### Method 1: Close Windows (Recommended)
1. Click the **X button** on the Backend window
2. Click the **X button** on the Frontend window
✅ Both servers will stop immediately

### Method 2: Keyboard Shortcut
In either window:
```
Press: Ctrl + C
Confirm: Y
```
✅ That server stops

### Method 3: PowerShell Command (Advanced)
If using PowerShell launcher:
```powershell
# Kill backend
Stop-Process -Id <BACKEND_PID> -Force

# Kill frontend
Stop-Process -Id <FRONTEND_PID> -Force
```

---

## Other Script Options

### PowerShell Version (Windows)
```powershell
cd d:\SmartWaterSystem
.\run.ps1
```

**Advantages:**
- Shows process IDs
- Better error tracking
- Color-coded output
- Process monitoring

### Bash Version (Mac/Linux)
```bash
cd d:/SmartWaterSystem
bash run.sh
```

---

## What Each Window Does

### Backend Window
```
Title: "Backend Server - SmartWater (Port 5000)"
Shows: Node.js server startup
Displays: API endpoints, database connections
Port: 5000
```

### Frontend Window
```
Title: "Frontend Server - SmartWater (Port 3000)"
Shows: React compilation output
Displays: Build status, warnings, errors
Port: 3000
```

---

## Understanding the Output

### Backend Startup (You'll See):
```
➜  backend npm start

> backend@1.0.0 start
> node server.js

Server running on port 5000
MongoDB Connected
```

### Frontend Startup (You'll See):
```
➜  frontend npm start

> frontend@2.0.0 start
> react-scripts start

Compiled successfully!

You can now view frontend in the browser.
  Local: http://localhost:3000
```

---

## Troubleshooting

### Servers Won't Start?

#### Error: "EADDRINUSE"
```
Problem: Port already in use
Solution: 
  1. Close any existing backend/frontend windows
  2. Try running script again
  Or manually:
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
```

#### Error: "npm not found"
```
Problem: Node.js not installed
Solution:
  1. Install Node.js from nodejs.org
  2. Restart terminal/computer
  3. Try script again
```

#### Error: "Cannot find module"
```
Problem: Dependencies not installed
Solution:
  cd d:\SmartWaterSystem\backend
  npm install
  cd ../frontend
  npm install
  Then run script
```

### Frontend Not Loading at http://localhost:3000?

```
Possible Causes:
1. Frontend still compiling (wait 30 seconds)
2. Port 3000 blocked by firewall
3. Browser cache issues

Solutions:
- Hard refresh: Ctrl + Shift + R
- Clear cache: Ctrl + Shift + Delete
- Try different browser
- Wait another 30 seconds
```

### Login Not Working?

```
Problem: "Invalid email or password"
Solution:
  Make sure you're using:
  Email:    bensen@farm.com (NOT username!)
  Password: password123
  
  Or try other test accounts:
  christy@farm.com / password123
  basith@farm.com / password123
  admin@smartwater.com / admin123
```

---

## Features to Check

Once logged in, you should see:

### 🎨 Purple Theme Features
- ✅ Deep purple background
- ✅ Glowing purple card borders
- ✅ Hot pink hover effects
- ✅ Bright gold statistics
- ✅ Bright white text

### 📊 Chart Improvements
- ✅ Legend at BOTTOM (visible!)
- ✅ Temperature: 1 decimal (25.3°C)
- ✅ Water: 1 decimal (45.2L)
- ✅ Clean, professional display

### 🌐 Dashboard Features
- ✅ Farm statistics
- ✅ Sensor data charts
- ✅ Real-time moisture levels
- ✅ Irrigation controls
- ✅ Trade market
- ✅ User profile

---

## Quick Reference

### Files Location
```
run.bat      → d:\SmartWaterSystem\run.bat
run.ps1      → d:\SmartWaterSystem\run.ps1
run.sh       → d:\SmartWaterSystem\run.sh
```

### URLs
```
Dashboard:   http://localhost:3000
API:         http://localhost:5000
```

### Test Credentials
```
Email:    bensen@farm.com
Password: password123
```

### Process IDs (If Using PowerShell)
```
Shown in console output:
Backend:  PID: 12345
Frontend: PID: 12346
```

---

## Advanced Usage

### Running Scripts from Command Line

#### Option 1: Using run.bat
```bash
cd d:\SmartWaterSystem
run.bat
```

#### Option 2: Using run.ps1
```powershell
cd d:\SmartWaterSystem
powershell -ExecutionPolicy Bypass -File .\run.ps1
```

#### Option 3: Manual Start
```bash
# Terminal 1
cd d:\SmartWaterSystem\backend
npm start

# Terminal 2 (new window)
cd d:\SmartWaterSystem\frontend
npm start
```

---

## Server Status Indicators

### ✅ Server Running Correctly
```
Backend shows: "Server running on port 5000"
              "MongoDB Connected"

Frontend shows: "Compiled successfully!"
               "Local: http://localhost:3000"
```

### ❌ Server Not Running
```
Backend shows: Error messages
              "EADDRINUSE" or "Cannot connect to database"

Frontend shows: Compilation errors
               "FAILED" or "ERROR"
```

---

## Stopping All Servers

### Quick Method (Windows)
1. Press `Alt + Tab` to switch between windows
2. Click the X button on each window
3. Both servers stop

### Safe Method
1. In backend window: Press `Ctrl + C` → Type `Y` → Press Enter
2. In frontend window: Press `Ctrl + C` → Type `Y` → Press Enter
3. Both servers stop

---

## Logs & Debugging

### Backend Logs
```
Watch the backend window for:
- API requests
- Database queries
- Authentication events
- Errors (in red)
```

### Frontend Logs
```
Watch the frontend window for:
- Build process
- Component warnings
- React errors
- Performance tips
```

### Browser Console
```
Press: F12
Go to: Console tab
See:   JavaScript errors, network requests, warnings
```

---

## Performance Tips

### For Faster Startup
1. Close other applications
2. Ensure no other servers using ports 5000/3000
3. Use run.bat (fastest)

### For Better Performance
1. Close unused browser tabs
2. Disable browser extensions
3. Use Chrome or Edge (faster)

---

## Getting Help

### If Something Goes Wrong

1. **Check Backend Window**
   - Look for error messages
   - Note any red text

2. **Check Frontend Window**
   - Look for compilation errors
   - Note any "FAILED" messages

3. **Check Browser Console** (F12)
   - Look for JavaScript errors
   - Check Network tab

4. **Try Hard Refresh**
   - Ctrl + Shift + R (Windows)
   - Cmd + Shift + R (Mac)

5. **Restart Everything**
   - Close all windows
   - Run script again
   - Wait full 30 seconds

---

## Estimated Timeline

```
Run script               → 0 seconds
Backend starts          → 0-5 seconds
Frontend starts         → 5-8 seconds
Frontend compiles       → 8-30 seconds
Ready to use            → 30+ seconds
```

---

## Summary

### To Start:
```
Double-click: run.bat
Wait: 30 seconds
Open: http://localhost:3000
Login: bensen@farm.com / password123
Enjoy!
```

### To Stop:
```
Close backend window (X button)
Close frontend window (X button)
Done!
```

### Features:
```
🍇 Purple Grapefruit Theme
✨ Interactive Border Glow
💜 Optimized Numbers
📊 Beautiful Charts
🔐 Secure Login
💰 Trade Market
🌾 Farm Management
```

---

**Your system is ready to run! Just double-click `run.bat` and enjoy!** 🚀

