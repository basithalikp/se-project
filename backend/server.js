const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

// Import routes
const authRoutes = require("./routes/authRoutes")
const sensorRoutes = require("./routes/sensorRoutes")
const tradeRoutes = require("./routes/tradeRoutes")
const farmRoutes = require("./routes/farmRoutes")
const waterRoutes = require("./routes/waterRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection - Use environment variable or fallback to localhost
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/smartWaterDB"

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log("MongoDB Connected")
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err)
})

// Routes
app.use("/auth", authRoutes)
app.use("/sensor", sensorRoutes)
app.use("/trade", tradeRoutes)
app.use("/farm", farmRoutes)
app.use("/water", waterRoutes)

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Smart Water Management API Running",
    version: "2.0",
    endpoints: {
      auth: "/auth",
      sensor: "/sensor",
      trade: "/trade",
      farm: "/farm"
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : "Error"
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})