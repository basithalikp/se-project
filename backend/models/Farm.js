const mongoose = require("mongoose")

const FarmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  farmName: {
    type: String,
    required: true
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  area: {
    type: Number, // in hectares
    required: true
  },
  cropType: {
    type: String,
    enum: ["rice", "wheat", "corn", "sugarcane", "cotton", "vegetables"],
    required: true
  },
  soilType: {
    type: String,
    enum: ["clay", "sandy", "loamy", "silty"],
    default: "loamy"
  },
  waterSource: {
    type: String,
    enum: ["well", "borewell", "canal", "pond", "underground"],
    default: "well"
  },
  activeIrrigation: {
    type: Boolean,
    default: false
  },
  totalWaterUsed: {
    type: Number,
    default: 0 // in liters
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Farm", FarmSchema)
