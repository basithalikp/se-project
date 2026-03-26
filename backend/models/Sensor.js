const mongoose = require("mongoose")

const SensorSchema = new mongoose.Schema({

farmId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Farm",
  required: true
},

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

soilMoisture: {
  type: Number,
  required: true,
  min: 0,
  max: 100
},

temperature: {
  type: Number,
  required: true
},

humidity: {
  type: Number,
  default: 0
},

waterNeeded: {
  type: Number,
  default: 0
},

status: {
  type: String,
  enum: ["optimal", "low", "critical"],
  default: "optimal"
},

date: {
  type: Date,
  default: Date.now
}

})

module.exports = mongoose.model("Sensor", SensorSchema)