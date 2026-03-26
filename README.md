# 💧 Smart Water Management System

A comprehensive web application for managing farm water resources with real-time sensor data, water trading, and automated irrigation control.

## ✨ Features

- 📊 **Real-Time Monitoring** - Track soil moisture, temperature, and water needs
- 💰 **Water Trading** - Buy and sell water with other farmers
- 💨 **Automated Irrigation** - Control irrigation based on sensor data
- 📈 **Analytics Dashboard** - Visualize trends and performance metrics
- 🗺️ **Farm Mapping** - Interactive map view of your farms
- 👥 **Multi-User Support** - Farmer and admin roles
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Chart.js** - Data visualization
- **CSS3** - Custom styling with animations
- **Responsive Design** - Mobile-friendly

### Backend
- **Node.js + Express** - REST API server
- **MongoDB** - NoSQL database
- **Mongoose** - Data modeling
- **JWT** - Authentication and authorization
- **bcryptjs** - Password encryption

### Infrastructure
- **Git** - Version control
- **Docker** - Containerization (optional)
- **Railway** - Backend deployment
- **Vercel** - Frontend deployment
- **MongoDB Atlas** - Cloud database

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-water-system.git
cd smart-water-system
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The frontend will run on `http://localhost:3001`

### 4. Access the Application

Open your browser and go to:
```
http://localhost:3001
```

## 📝 Demo Accounts

Use these credentials to test the application:

| Username | Password | Role |
|----------|----------|------|
| admin | password | Admin |
| bensen_farm | password | Farmer |
| christy_farm | password | Farmer |
| basith_farm | password | Farmer |

Each account starts with:
- 💧 **10,000L** water inventory
- 💰 **5,000** credits

## 📁 Project Structure

```
smart-water-system/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication, validation
│   ├── scripts/         # Setup and migration scripts
│   ├── server.js        # Express server
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   ├── package.json
│   └── .env.example
├── README.md            # This file
├── .gitignore          # Git ignore rules
└── GITHUB_HOSTING_GUIDE.md

```

## 🔐 API Endpoints

### Water Management
```
POST   /api/water/buy              - Buy water
POST   /api/water/sell             - Sell water
POST   /api/water/deduct           - Deduct water
POST   /api/water/record-irrigation - Record irrigation
GET    /api/water/history          - Get transaction history
```

### Sensors
```
GET    /api/sensors                - Get all sensors
POST   /api/sensors                - Create sensor reading
GET    /api/sensors/latest         - Get latest readings
GET    /api/sensors/:farmId        - Get farm sensor data
```

### Authentication
```
POST   /api/auth/register          - Register user
POST   /api/auth/login             - Login user
POST   /api/auth/profile           - Get user profile
```

## 🌍 Deployment

### Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically

**Frontend URL:** `https://smart-water-system.vercel.app`

### Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Set environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas URI
   - `JWT_SECRET` - Your secret key

**Backend URL:** `https://smart-water-system-backend.railway.app`

### Use MongoDB Atlas for Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Use in `MONGODB_URI` environment variable

## 📊 Database Schema

### User
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  role: "farmer" | "admin",
  farmName: String,
  waterCredits: Number,
  waterInventory: Number,
  createdAt: Date
}
```

### Sensor
```javascript
{
  _id: ObjectId,
  farmId: ObjectId,
  soilMoisture: Number,
  temperature: Number,
  waterNeeded: Number,
  timestamp: Date
}
```

### Water Transaction
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: "buy" | "sell" | "irrigation",
  amount: Number,
  credits: Number,
  timestamp: Date
}
```

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod`
- Check port 5000 is free
- Check `.env` file has correct MONGODB_URI

### Frontend won't start
- Check port 3000/3001 is free
- Clear node_modules: `rm -rf node_modules && npm install`
- Check `.env.local` has correct REACT_APP_API_URL

### Can't connect to database
- Verify MongoDB is running
- Check MongoDB URI in `.env`
- For MongoDB Atlas, verify IP whitelist

### Water system locked
- Run: `node scripts/fixDeadlock.js`
- This gives everyone 10,000L water and 5,000 credits

## 📚 Documentation

- [GitHub Hosting Guide](./GITHUB_HOSTING_GUIDE.md)
- [Water System Documentation](./FINAL_ANSWER_WATER_SOURCE.md)
- [Deployment Options](./DEPLOYMENT_OPTIONS.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Your Name** - [GitHub](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- React team for excellent documentation
- MongoDB for reliable database
- Chart.js for beautiful charts
- Railway and Vercel for easy deployment

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and screenshots

## 🚀 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Weather API integration
- [ ] Email notifications
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] API documentation (Swagger)

---

**⭐ If you find this project useful, please star it on GitHub!**

Last Updated: March 26, 2026
