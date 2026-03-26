const mongoose = require("mongoose")
const User = require("../models/User")
require("dotenv").config()

const fixDeadlock = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/smartwater")
    console.log("✅ Connected to MongoDB\n")

    // Set everyone to have 10,000L water + 5,000 starting credits
    const result = await User.updateMany(
      {},
      { 
        $set: { 
          waterInventory: 10000,  // 10,000 liters to sell OR use
          waterCredits: 5000       // 5,000 credits to buy with
        } 
      },
      { multi: true }
    )

    console.log(`✅ Updated ${result.modifiedCount} users\n`)

    // Show all users with their updated inventory
    const users = await User.find({}, { username: 1, waterInventory: 1, waterCredits: 1 })
    
    console.log("📊 All Users - Current Status:")
    console.log("════════════════════════════════════════════════════")
    users.forEach((user, idx) => {
      console.log(`${idx + 1}. ${user.username}`)
      console.log(`   💧 Water: ${user.waterInventory.toFixed(0)}L`)
      console.log(`   💰 Credits: ${user.waterCredits}`)
      console.log(`   ✅ Can BUY water: ${user.waterCredits >= 100 ? "YES" : "NO"}`)
      console.log(`   ✅ Can SELL water: ${user.waterInventory >= 1 ? "YES" : "NO"}`)
      console.log("")
    })

    console.log("════════════════════════════════════════════════════")
    console.log("\n🎉 DEADLOCK FIXED!")
    console.log("   ✅ Everyone has 10,000L water to sell or use for irrigation")
    console.log("   ✅ Everyone has 5,000 credits to buy more water if needed")
    console.log("   ✅ No more circular dependency - you can DO either:")
    console.log("      • SELL your water to get credits")
    console.log("      • BUY water with your credits")
    console.log("      • USE water for irrigation")

    // Close connection
    await mongoose.connection.close()
    console.log("\n✅ Database connection closed")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

fixDeadlock()
