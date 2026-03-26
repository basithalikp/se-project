# 🚀 Quick Reference Guide

## 5-Minute Setup

```powershell
# Terminal 1: Start Backend
cd D:\SmartWaterSystem\backend
node server.js
# Expected: "Server running on port 5000" + "MongoDB Connected"

# Terminal 2: Start Frontend  
cd D:\SmartWaterSystem\frontend
npm start
# Expected: Opens http://localhost:3000 in browser
```

## 2-Minute Overview

### What is This?
Smart Water Management System - IoT agricultural water monitoring and trading platform

### Who Can Use It?
- **Farmers**: Monitor soil moisture, control irrigation, trade water credits
- **Admins**: View all data, manage system, access advanced analytics

### Key Features
- 📊 Real-time sensor dashboard
- 💧 Soil moisture monitoring
- 💨 Irrigation control
- 🏪 Water credit trading
- 🗺️ Interactive farm maps
- 📉 Data visualization charts
- 👤 User profiles & settings

---

## Login Demo

### Admin Account
```
Email: admin@smartwater.com
Password: admin123
Role: admin
```

### Farmer Account
```
Email: farmer@smartwater.com
Password: farmer123
Role: farmer
```

> **Note**: Create your own account via registration

---

## Navigation Guide

```
🏠 Home/Dashboard
├─ 📊 Dashboard (View all sensor data)
├─ 📈 Analytics (Admin only - Coming soon)
├─ 💨 Irrigation (Control irrigation systems)
├─ 🏪 Trade Market (Buy/sell water credits)
├─ 🗺️ Farm Map (View farm locations)
├─ 📉 Chart Analytics (Visualize data)
└─ 👤 Profile (Manage account & farms)
```

---

## Common Tasks

### 1. Add a Farm
1. Go to **Profile** tab
2. Click **Add Farm**
3. Fill in:
   - Farm Name
   - Latitude & Longitude
   - Area (hectares)
   - Crop Type
   - Soil Type
   - Water Source
4. Click **Submit**

### 2. View Sensor Data
1. Go to **Dashboard** tab
2. See statistics cards at top
3. Scroll down for detailed table
4. Check status badges for farm health

### 3. Trade Water Credits
1. Go to **Trade Market** tab
2. View available listings
3. To **Buy**: Click listing → Enter amount → Confirm
4. To **Sell**: Click "Create Listing" → Set price → Submit

### 4. Monitor Irrigation
1. Go to **Irrigation** tab
2. See all farms with controls
3. Click **Start Irrigation**
4. View activity log below

### 5. Check Farm Locations
1. Go to **Farm Map** tab
2. See interactive map with farms
3. Markers show soil moisture levels
4. Click marker for farm details

---

## Key Statistics

### Dashboard Shows
- **Total Readings**: Number of sensor data points
- **Avg Moisture**: Average soil moisture across farms
- **Avg Temperature**: Average temperature readings
- **Critical Status**: Number of critical alerts

### Status Meanings
- ✓ **Optimal**: Moisture > 50% (green badge)
- ⚠ **Low**: Moisture 30-50% (orange badge)  
- ✕ **Critical**: Moisture < 30% (red badge)

---

## API Endpoints (For Developers)

### Auth
```
POST   /auth/register       - Create account
POST   /auth/login          - Login
PUT    /auth/profile        - Update profile
```

### Farms
```
POST   /farms              - Create farm
GET    /farms              - Get your farms
PUT    /farms/:id          - Update farm
DELETE /farms/:id          - Delete farm
```

### Sensors
```
POST   /sensors            - Add reading
GET    /sensors            - Get all sensors
GET    /sensors/farm/:id   - Get farm sensors
GET    /sensors/latest     - Get latest readings
```

### Trade
```
POST   /trade              - Create listing
GET    /trade              - View marketplace
POST   /trade/buy          - Buy credits
DELETE /trade/:id          - Cancel listing
```

---

## Troubleshooting

### Backend Won't Start
```
Error: Port 5000 already in use?
→ Kill process: netstat -ano | findstr :5000
   taskkill /PID <PID> /F

Error: MongoDB not connected?
→ Ensure MongoDB is running locally
→ Check connection string in .env
```

### Frontend Won't Load
```
Error: Port 3000 in use?
→ Kill process or use different port

Error: Dependencies missing?
→ Run: npm install (in frontend folder)

Error: Blank page?
→ Check browser console for errors
→ Verify backend is running
```

### Farm Names Show "N/A"
```
→ Backend issue likely
→ Check backend logs
→ Ensure MongoDB has farms data
→ Restart both frontend and backend
```

### Can't Login
```
→ Verify credentials are correct
→ Create new account via registration
→ Check backend logs for errors
→ Ensure MongoDB is connected
```

---

## File Structure

```
SmartWaterSystem/
├── backend/                    # Node.js + Express
│   ├── models/                # MongoDB schemas
│   ├── controllers/           # API logic
│   ├── routes/                # API endpoints
│   ├── middleware/            # Auth middleware
│   ├── .env                   # Environment config
│   └── server.js              # Entry point
│
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── api.js             # API client
│   │   ├── styles.css         # Global styles
│   │   └── App.js             # Main app
│   └── package.json
│
└── docs/                       # Documentation
    ├── QUICK_START.md
    ├── IMPLEMENTATION_GUIDE.md
    ├── UI_IMPROVEMENTS.md
    └── SYSTEM_STATUS.md
```

---

## Environment Setup

### Backend .env
```
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smartWaterDB
```

### Frontend .env (Optional)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Performance Tips

### Faster Loading
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Refresh page: `F5`
3. Hard refresh: `Ctrl+Shift+R`

### Better Performance
1. Keep MongoDB running
2. Don't open too many tabs
3. Use Chrome for best performance
4. Close unused applications

### Monitor Performance
- Open DevTools: `F12`
- Network tab: Check API response times
- Console tab: Look for errors
- Performance tab: Check frame rate

---

## Best Practices

### For Farmers
- ✅ Check dashboard daily
- ✅ Set up farms correctly
- ✅ Monitor moisture levels
- ✅ Act on critical alerts
- ✅ Keep water credits balanced

### For Admins
- ✅ Monitor all users
- ✅ Check system performance
- ✅ Review analytics regularly
- ✅ Manage marketplace
- ✅ Handle support tickets

### For Developers
- ✅ Use meaningful variable names
- ✅ Add comments for complex code
- ✅ Test all changes locally
- ✅ Follow existing patterns
- ✅ Document new features

---

## Useful Links

| Resource | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| MongoDB | 127.0.0.1:27017 |
| GitHub | [Repository] |
| Documentation | ./docs/ |

---

## Advanced Configuration

### Change Port
**Backend** (server.js):
```javascript
const PORT = process.env.PORT || 5001;
```

**Frontend** (.env):
```
PORT=3001
```

### Change Database
**.env**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db
```

### Enable CORS
**server.js**:
```javascript
app.use(cors({
  origin: ["http://localhost:3000", "https://yourdomain.com"]
}));
```

---

## Security Notes

### Important
- ⚠️ Never commit .env file
- ⚠️ Don't expose JWT_SECRET
- ⚠️ Use HTTPS in production
- ⚠️ Validate all inputs
- ⚠️ Use strong passwords

### Production Checklist
- [ ] Change JWT_SECRET to random string
- [ ] Use MongoDB Atlas (cloud)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall
- [ ] Set up monitoring
- [ ] Enable logging
- [ ] Use environment-specific configs

---

## Getting Help

### Documentation
1. **QUICK_START.md** - Setup instructions
2. **IMPLEMENTATION_GUIDE.md** - API reference
3. **SYSTEM_STATUS.md** - Current status
4. **UI_IMPROVEMENTS.md** - UI details
5. **UI_SHOWCASE.md** - Design guide

### Support Channels
- Check browser console for errors
- Review backend logs
- Check MongoDB connection
- Test API endpoints with Postman
- Read code comments

---

## Version Info

| Component | Version |
|-----------|---------|
| Node.js | 24.14.0+ |
| React | 19.2.4 |
| Express | 4.18.2 |
| MongoDB | 7.0.0+ |
| MongoDB Driver | 7.0.0+ |

---

## License & Credits

**Smart Water Management System**
- Built for agricultural water management
- Developed with React & Node.js
- MongoDB backend
- Open source architecture

---

## Contact & Support

For issues or questions:
1. Check documentation files
2. Review console/logs for errors
3. Verify all services are running
4. Test API endpoints separately
5. Check network connectivity

---

## Quick Commands

```powershell
# Start Backend
cd backend && node server.js

# Start Frontend
cd frontend && npm start

# Install Dependencies (Backend)
cd backend && npm install

# Install Dependencies (Frontend)
cd frontend && npm install

# Stop all services
# Ctrl+C in both terminals

# Kill process on port
netstat -ano | findstr :3000  # Find PID
taskkill /PID <PID> /F        # Kill it

# Check MongoDB
mongosh  # Connect to local MongoDB
```

---

## FAQ

**Q: How do I create test data?**
A: Register a new account and add farms. Sensor data is generated in real-time.

**Q: Can I use this on mobile?**
A: Yes! The app is fully responsive. Works great on tablets and phones.

**Q: How do I export data?**
A: PDF export coming soon in Analytics section.

**Q: Is my data secure?**
A: Yes! Uses JWT tokens, password hashing, and encrypted connections.

**Q: Can I deploy to cloud?**
A: Yes! Works with AWS, Azure, Google Cloud, Heroku, and others.

**Q: What's the roadmap?**
A: Check LATEST_UPDATES.md for planned features.

---

## Success Indicators

✅ If you see this, everything is working:
- [ ] Backend shows "Server running on port 5000"
- [ ] Backend shows "MongoDB Connected"
- [ ] Frontend loads at http://localhost:3000
- [ ] Login page appears with nice styling
- [ ] Can create account
- [ ] Can see dashboard with data
- [ ] Navigation tabs work
- [ ] No console errors

---

**Ready to manage water efficiently? Let's go! 💧🚀**

---

# 🎯 UPDATED: Scripts & Stop Button (March 25, 2026)

## HOW TO START (Windows)

### Easiest Way - Double-Click
```
1. Open: d:\SmartWaterSystem
2. Double-click: run.bat
3. Wait: 30 seconds
4. Open: http://localhost:3000
5. Login: bensen@farm.com / password123
```

### Two new windows will open:
- **Backend Server - SmartWater (Port 5000)**
- **Frontend Server - SmartWater (Port 3000)**

---

## HOW TO STOP SERVERS

### Method 1: Stop Button (NEW!) ✨
```
1. Look top-right of dashboard
2. Click: 🛑 Stop Servers button
3. Click: OK in confirmation dialog
4. Done! All servers stop
```

### Method 2: Close Windows
```
1. Close Backend window (X button)
2. Close Frontend window (X button)
3. Done!
```

### Method 3: Keyboard
```
In either window:
Press: Ctrl + C
Type: Y
Press: Enter
```

---

## NEW FEATURES ADDED

✨ **Stop Servers Button**
- Located in top-right corner (next to Logout)
- Single click to stop everything
- Confirmation dialog (prevents accidents)
- Automatic window closing

📍 **Scripts Improved**
- run.bat - Windows batch (EASIEST!)
- run.ps1 - PowerShell (shows PIDs)
- run.sh - Bash script (Mac/Linux)

📚 **New Documentation**
- HOW_TO_USE_SCRIPTS.md - Complete usage guide
- STOP_SERVERS_GUIDE.md - All stop methods explained
- PURPLE_THEME_GUIDE.md - Theme customization

---

## QUICK COMMANDS

```
START:  Double-click run.bat
STOP:   Click 🛑 Stop Servers button OR close windows
LOGIN:  bensen@farm.com / password123
OPEN:   http://localhost:3000
```

---

**Everything is ready to use! Just run and enjoy! 🚀**
