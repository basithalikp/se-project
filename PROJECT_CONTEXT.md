# Smart Water Management System

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB

## Features Implemented
- Sensor Data API
- Water Calculation Engine
- Dashboard UI
- Soil Moisture Chart
- Water Trading Marketplace
- Irrigation Control Panel
- Login System (Admin/Farmer)
- Farm Map using Leaflet

## API Endpoints

### Sensor
POST /sensor/add
GET /sensor/all

### Trade
POST /trade/create
GET /trade/all

## Logic

Water Calculation:
- Moisture < 30 → 1000L
- Moisture < 50 → 500L
- Else → 0L

## Goal
Build a smart agriculture platform with:
- Monitoring
- Analytics
- Trading
- Irrigation control

## File structure

backend/
 ├── models/
 ├── routes/
 ├── controllers/
 ├── server.js

frontend/
 ├── src/
 │   ├── Dashboard.js
 │   ├── MoistureChart.js
 │   ├── TradeMarket.js
 │   ├── IrrigationPanel.js
 │   ├── FarmMap.js
 │   ├── Login.js
 │   ├── App.js