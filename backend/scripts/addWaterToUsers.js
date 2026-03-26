const mongoose = require("mongoose")
const User = require("../models/User")
require("dotenv").config()

const addWaterToAllUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/smartwater")
    console.log("✅ Connected to MongoDB")

    // Update all users: set waterInventory to 10000 liters
    const result = await User.updateMany(
      {},
      { $set: { waterInventory: 10000 } },
      { multi: true }
    )

    console.log(`✅ Updated ${result.modifiedCount} users with 10,000L of water`)

    // Show all users with their water inventory
    const users = await User.find({}, { username: 1, waterInventory: 1, waterCredits: 1 })
    console.log("\n📊 All Users Water Inventory:")
    console.log("================================")
    users.forEach(user => {
      console.log(`${user.username}: ${user.waterInventory}L water | ${user.waterCredits} credits`)
    })

    console.log("================================")
    console.log("✅ Done! All users now have water in inventory!")

    // Close connection
    await mongoose.connection.close()
    console.log("✅ Connection closed")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

addWaterToAllUsers()
