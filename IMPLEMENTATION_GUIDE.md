# Smart Water Management System - Complete Implementation Guide

## 🌾 Project Overview

A comprehensive agricultural water management system that combines IoT sensor data, intelligent irrigation control, and a water trading marketplace. Built with React, Node.js, and MongoDB.

### Key Features:
- ✅ User Authentication (Admin/Farmer roles)
- ✅ Farm Profile Management with Geolocation
- ✅ Real-time Soil Moisture & Temperature Monitoring
- ✅ Intelligent Water Calculation Engine
- ✅ Automated Irrigation Control Panel
- ✅ Water Trading Marketplace with Credit System
- ✅ Advanced Analytics & Reporting
- ✅ Responsive UI with Professional Styling
- ✅ Real-time Data Visualization with Charts

---

## 🚀 Quick Start

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   - File: `backend/.env`
   ```
   JWT_SECRET=smartwater_secret_key_2026
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/smartWaterDB
   ```

3. **Ensure MongoDB is Running**
   - MongoDB should be running on `localhost:27017`

4. **Start Backend Server**
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start   # Production
   ```
   - Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Frontend Server**
   ```bash
   npm start
   ```
   - Application opens on `http://localhost:3000`

---

## 📋 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_farmer",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "farmer",
  "farmName": "Green Valley Farm",
  "location": "Karnataka"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "username": "john_farmer",
    "email": "john@example.com",
    "role": "farmer",
    "waterCredits": 1000
  }
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "farmName": "Green Valley Farm",
  "location": "Karnataka",
  "phoneNumber": "9876543210"
}
```

---

### Farm Management Endpoints

#### Create Farm
```http
POST /farm
Authorization: Bearer {token}
Content-Type: application/json

{
  "farmName": "North Field",
  "latitude": 13.2765,
  "longitude": 79.8854,
  "area": 5.5,
  "cropType": "rice",
  "soilType": "loamy",
  "waterSource": "well"
}
```

#### Get User's Farms
```http
GET /farm/user-farms
Authorization: Bearer {token}
```

#### Get All Farms (Admin)
```http
GET /farm/admin/all-farms
Authorization: Bearer {token}
```

#### Update Farm
```http
PUT /farm/{farmId}
Authorization: Bearer {token}
```

#### Delete Farm
```http
DELETE /farm/{farmId}
Authorization: Bearer {token}
```

---

### Sensor Data Endpoints

#### Add Sensor Reading
```http
POST /sensor/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "farmId": "farm_object_id",
  "soilMoisture": 35,
  "temperature": 28,
  "humidity": 65
}
```

**Water Calculation Logic:**
- Moisture < 30% → 1000L (Critical)
- Moisture < 50% → 500L (Low)
- Moisture ≥ 50% → 0L (Optimal)

#### Get All Sensors
```http
GET /sensor/all
```

#### Get User's Sensor Data
```http
GET /sensor/user-data
Authorization: Bearer {token}
```

#### Get Farm's Sensor Data
```http
GET /sensor/farm/{farmId}
```

#### Get Latest Readings
```http
GET /sensor/latest/readings
```

---

### Water Trading Endpoints

#### Create Trade Listing
```http
POST /trade/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "waterCredits": 100,
  "pricePerCredit": 5.50
}
```

#### Get Available Trades
```http
GET /trade/all
```

#### Get User's Trade Listings
```http
GET /trade/user-trades
Authorization: Bearer {token}
```

#### Buy Trade
```http
POST /trade/buy/{tradeId}
Authorization: Bearer {token}
```

#### Cancel Trade
```http
POST /trade/cancel/{tradeId}
Authorization: Bearer {token}
```

#### Get Trade History
```http
GET /trade/history
Authorization: Bearer {token}
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (admin/farmer),
  farmName: String,
  location: String,
  phoneNumber: String,
  waterCredits: Number,
  createdAt: Date
}
```

### Farm Collection
```javascript
{
  userId: ObjectId (ref: User),
  farmName: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  area: Number,
  cropType: String,
  soilType: String,
  waterSource: String,
  activeIrrigation: Boolean,
  totalWaterUsed: Number,
  createdAt: Date
}
```

### Sensor Collection
```javascript
{
  farmId: ObjectId (ref: Farm),
  userId: ObjectId (ref: User),
  soilMoisture: Number (0-100),
  temperature: Number,
  humidity: Number,
  waterNeeded: Number,
  status: String (optimal/low/critical),
  date: Date
}
```

### Trade Collection
```javascript
{
  sellerId: ObjectId (ref: User),
  buyerId: ObjectId (ref: User) [optional],
  waterCredits: Number,
  pricePerCredit: Number,
  totalPrice: Number,
  status: String (listed/pending/completed/cancelled),
  transactionDate: Date,
  createdAt: Date
}
```

---

## 🎯 User Roles & Permissions

### Farmer
- ✅ View own farm data
- ✅ Manage own farms
- ✅ Control irrigation
- ✅ Create water trading listings
- ✅ Purchase water from marketplace
- ✅ View personal analytics
- ❌ Cannot access admin features

### Admin
- ✅ View all farms and sensor data
- ✅ View analytics and reports
- ✅ Monitor system performance
- ✅ View all trades
- ✅ All farmer permissions

---

## 🔑 Authentication

The system uses **JWT (JSON Web Tokens)** for authentication.

### Token Structure:
```javascript
{
  userId: "user_object_id",
  username: "john_farmer",
  role: "farmer",
  iat: 1234567890,
  exp: 1234567890 + 7days
}
```

### How to Use:
1. User registers/logs in
2. Server returns JWT token
3. Store token in localStorage
4. Include in all requests: `Authorization: Bearer {token}`
5. Token auto-refreshes on app load

---

## 📊 Frontend Components

### Dashboard
- Statistics cards (total readings, avg moisture, avg temperature)
- Real-time sensor data table
- Status indicators (optimal/low/critical)
- Auto-refresh every 5 seconds

### Moisture Chart
- Multiple chart types (Line, Bar)
- Real-time data visualization
- Statistics summary
- Switchable between Moisture/Temperature/Water charts

### Farm Map
- Interactive Leaflet map
- Farm location markers
- Circle markers indicating moisture levels
- Color-coded status (Red=Critical, Orange=Low, Green=Optimal)
- Farm details popup

### Irrigation Panel
- Farms needing irrigation
- Moisture level progress bars
- Start/Stop irrigation controls
- Irrigation activity log
- Status tracking (Active/Completed/Stopped)

### Trade Market
- Browse available water listings
- Create new trade listings
- Buy water from other farmers
- View personal listings
- Real-time credit balance
- Transaction history

### Profile Management
- Update personal information
- Farm management (Add/Edit/Delete)
- View water credits
- Farm details (area, crop type, soil type, location)

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Security:** bcryptjs
- **Validation:** Built-in Express middleware

### Frontend
- **Framework:** React 19
- **Styling:** CSS3 + Custom CSS
- **Charts:** Chart.js + react-chartjs-2
- **Maps:** Leaflet + react-leaflet
- **HTTP:** Axios
- **UI:** Bootstrap 5

---

## 📝 Development Workflow

### Backend Development
1. Create models in `backend/models/`
2. Create controllers in `backend/controllers/`
3. Define routes in `backend/routes/`
4. Add middleware in `backend/middleware/`
5. Import routes in `backend/server.js`

### Frontend Development
1. Create components in `frontend/src/`
2. Use API utilities from `frontend/src/api.js`
3. Import CSS from `frontend/src/styles.css`
4. Test components in development

### Adding New Features
1. **Backend:**
   - Create database model
   - Create controller functions
   - Create API routes
   - Add authentication middleware
   - Test with Postman/Insomnia

2. **Frontend:**
   - Create React component
   - Use API hooks
   - Add to main App navigation
   - Style with CSS classes
   - Test in browser

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill process
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Backend CORS is configured. Ensure frontend URL is correct.

### Token Expired
```
Error: Invalid or expired token
```
**Solution:** Clear localStorage and login again
```javascript
localStorage.clear()
```

---

## 📦 Deployment

### Heroku Deployment

**Backend:**
```bash
# Create Heroku app
heroku create smartwater-backend

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main
```

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📄 License

Open source for educational purposes.

---

## 🤝 Support

For issues or questions, please check:
1. API documentation above
2. Component prop types
3. Console error messages
4. Troubleshooting section

---

## 🎓 Learning Resources

- [JWT Authentication](https://jwt.io)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Leaflet Maps](https://leafletjs.com)
- [Chart.js](https://www.chartjs.org)

---

**Last Updated:** March 18, 2026
**Version:** 2.0 (Complete Implementation)
