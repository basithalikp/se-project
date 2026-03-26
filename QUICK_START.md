# 🚀 QUICK START GUIDE - v2.0 Features

## ⚡ In 2 Minutes

### Start the System
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start
```

### Login
```
Admin:
Email: admin@smartwater.com
Password: Admin@123

Farmer:
Email: john@farm.com
Password: Farmer@123
```

---

## ✨ NEW FEATURES (v2.0)

### 1️⃣ Better Text Visibility ✅
- Charts now have larger, clearer fonts
- Dark background with bright gold statistics
- All labels easy to read

### 2️⃣ Cleaner Numbers ✅
- All numbers show exactly 2 decimal places
- Example: `25.12°C` instead of `25.123456°C`

### 3️⃣ Better Farm Names ✅
- Green Valley, Sunset Acres, Harvest Ridge
- More descriptive and professional

### 4️⃣ Buy Water 💧 NEW ✅
- New "💧 Water Market" tab
- Purchase water using credits (5 credits/liter)
- Real-time balance updates
- Transaction history tracking

### 5️⃣ Smart Validation ✅
- Real-time form validation
- Red borders on errors
- Clear error messages
- Errors clear as you fix them

### 6️⃣ Admin Security ✅
- Stop Server button only for admins
- Farmers cannot access admin features

---

## Prerequisites
- Node.js (v14+)
- MongoDB (running locally on port 27017)
- npm or yarn package manager
- Modern web browser

---

## ⚡ 60-Second Startup

### Step 1: Start Backend
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 2: Start Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```
✅ Frontend opening on http://localhost:3000

### Step 3: Access Application
- Browser automatically opens http://localhost:3000
- Register a new account
- Login and start using the system

---

## 📋 First Time Setup Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file configured in backend
- [ ] No port conflicts (3000, 5000)
- [ ] Frontend and backend both running

---

## 🎯 Getting Started with Features

### 1. Create Account
1. Click "Register" tab
2. Fill in details:
   - Username
   - Email
   - Password
   - Role (Farmer/Admin)
   - Farm Name
   - Location
3. Click "Register"

### 2. Add Your Farm
1. Go to "Profile" tab
2. Click "+ Add Farm"
3. Enter:
   - Farm name
   - Location (latitude/longitude)
   - Area in hectares
   - Crop type
   - Soil type
   - Water source
4. Click "Add Farm"

### 3. Monitor Sensors
1. Go to "Dashboard" tab
2. See real-time sensor data
3. Check soil moisture levels
4. Monitor water needs

### 4. Control Irrigation
1. Go to "Irrigation" tab
2. See farms needing water
3. Click "Start Irrigation"
4. View activity log

### 5. Trade Water
1. Go to "Trade Market" tab
2. To buy: Click "Buy" on any listing
3. To sell: Click "+ Sell Water"
4. Enter credits and price
5. Create listing

### 6. View Profile
1. Go to "Profile" tab
2. Update information
3. Manage farms
4. See water credits

---

## 🔧 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Port already in use
```
Error: EADDRINUSE: address already in use :::5000
```
**Fix:** Kill process on port 5000
```bash
# Find process ID
lsof -ti:5000

# Kill it
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Dependencies error
**Fix:** Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Login not working
**Fix:** Check localStorage
```javascript
// Open browser console (F12)
localStorage.clear()
// Then refresh and login again
```

---

## 📊 Sample Test Data

### Test Account (if pre-created)
- Email: `admin@example.com`
- Password: `admin123`
- Role: Admin

### Test Farm Data
- Farm Name: "Test Farm"
- Latitude: 13.2765
- Longitude: 79.8854
- Area: 5.5 ha
- Crop: Rice
- Soil: Loamy

### Sample Sensor Reading
- Soil Moisture: 35%
- Temperature: 28°C
- Humidity: 65%

---

## 🌐 API Quick Reference

### Authentication
```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"pass","role":"farmer"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass"}'
```

### Add Sensor Data
```bash
curl -X POST http://localhost:5000/sensor/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"farmId":"farm_id","soilMoisture":35,"temperature":28}'
```

### Create Trade
```bash
curl -X POST http://localhost:5000/trade/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"waterCredits":100,"pricePerCredit":5.50}'
```

---

## 📱 Using on Different Devices

### Mobile Browser
- Responsive design works on all sizes
- Touch-friendly buttons
- Optimized for mobile viewing

### Tablet
- Grid layout adapts
- Charts fit properly
- Easy to use interface

### Desktop
- Full-featured layout
- Larger charts and tables
- Optimal viewing experience

---

## 🔐 Security Tips

1. **Change JWT Secret** in `.env`
   ```
   JWT_SECRET=your_secure_random_string
   ```

2. **Use Strong Passwords**
   - At least 8 characters
   - Mix of letters, numbers, symbols

3. **Secure Token Storage**
   - Tokens stored in localStorage
   - Only accessible from same domain
   - Auto-clear on logout

4. **HTTPS in Production**
   - Always use HTTPS
   - Secure API endpoints
   - Encrypt data in transit

---

## 📚 Documentation

For detailed information, see:
- **`IMPLEMENTATION_GUIDE.md`** - Complete API reference
- **`COMPLETION_SUMMARY.md`** - Feature overview
- **`PROJECT_CONTEXT.md`** - Project background

---

## 🆘 Getting Help

### Check Logs
1. **Backend:** Terminal where you ran `npm run dev`
2. **Frontend:** Browser console (F12)
3. **API Errors:** Check browser Network tab (F12)

### Common Issues

| Issue | Solution |
|-------|----------|
| 404 errors | Check API endpoint URL |
| Auth failed | Check token in localStorage |
| Data not updating | Refresh page or wait 5 seconds |
| Map not showing | Check browser console for errors |
| Charts not rendering | Ensure Chart.js is loaded |

---

## 🎓 Learning Path

1. **Day 1:** Register, create farm, view dashboard
2. **Day 2:** Monitor sensors, control irrigation
3. **Day 3:** Try trading marketplace
4. **Day 4:** Explore all features
5. **Day 5:** Customize and extend

---

## 💡 Tips & Tricks

- **Auto-Refresh:** Data updates every 5 seconds
- **Color Coding:** Green=Good, Orange=Warning, Red=Alert
- **Mobile First:** Start with phone view, then desktop
- **Test Mode:** Create multiple accounts for testing
- **Export Data:** Download sensor readings from dashboard

---

## 🚀 Next Steps

After getting familiar:
1. Deploy to cloud (Heroku, Vercel)
2. Add real sensor hardware
3. Integrate weather API
4. Set up email notifications
5. Create mobile app

---

## 📞 Support

- Check `IMPLEMENTATION_GUIDE.md` for detailed API docs
- Review component code in `frontend/src/`
- Check backend controllers in `backend/controllers/`
- Check browser console for error messages

---

**Ready to Go!** 🌾

Start with the 60-second startup above and begin exploring the application.

For detailed setup, see the **IMPLEMENTATION_GUIDE.md** file.

Happy farming! 🚜
