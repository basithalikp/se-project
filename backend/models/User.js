const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "farmer"],
    default: "farmer"
  },
  farmName: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  waterCredits: {
    type: Number,
    default: 1000
  },
  waterInventory: {
    type: Number,
    default: 0 // liters of water available for irrigation
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hash password before saving
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)
