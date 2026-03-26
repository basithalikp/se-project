const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("./models/User")
const Farm = require("./models/Farm")
const Sensor = require("./models/Sensor")

// Connect to MongoDB
mongoose.connect("mongodb+srv://sithukp50_se_agriculture:tb8H9IO8zB9SHOiH@cluster0.rwwoabv.mongodb.net/smart-water?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error:", err))

// Seed data function
async function seedDatabase() {
  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...")
    await User.deleteMany({})
    await Farm.deleteMany({})
    await Sensor.deleteMany({})
    console.log("✅ Data cleared")

    // Create admin user
    console.log("👤 Creating admin user...")
    const adminUser = new User({
      username: "admin",
      email: "admin@smartwater.com",
      password: "admin123",
      role: "admin",
      waterCredits: 5000
    })
    await adminUser.save()
    console.log("✅ Admin user created:", adminUser.username)

    // Create 3 farmers
    console.log("\n👨‍🌾 Creating farmer users...")
    const farmers = []
    const farmerData = [
      { username: "bensen_farm", email: "bensen@farm.com", name: "Bensen" },
      { username: "christy_farm", email: "christy@farm.com", name: "Christy" },
      { username: "basith_farm", email: "basith@farm.com", name: "Basith" }
    ]

    for (const data of farmerData) {
      const farmer = new User({
        username: data.username,
        email: data.email,
        password: "password123",
        role: "farmer",
        waterCredits: 2000
      })
      await farmer.save()
      farmers.push(farmer)
      console.log(`✅ Farmer created: ${data.username}`)
    }

    // Farm data with randomization
    console.log("\n🌾 Creating farms...")
    const cropTypes = ["rice", "wheat", "corn", "sugarcane", "cotton", "vegetables"]
    const soilTypes = ["clay", "sandy", "loamy", "silty"]
    const waterSources = ["well", "borewell", "canal", "pond", "underground"]
    
    const farmDataArray = [
      {
        farmName: "Green Valley",
        userId: farmers[0]._id,
        location: {
          latitude: 12.9352 + Math.random() * 0.5,
          longitude: 77.6245 + Math.random() * 0.5
        },
        area: Math.random() * (50 - 5) + 5, // 5-50 hectares
        cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
        soilType: soilTypes[Math.floor(Math.random() * soilTypes.length)],
        waterSource: waterSources[Math.floor(Math.random() * waterSources.length)],
        activeIrrigation: Math.random() > 0.5,
        totalWaterUsed: Math.random() * 50000 + 10000
      },
      {
        farmName: "Sunset Acres",
        userId: farmers[1]._id,
        location: {
          latitude: 12.8000 + Math.random() * 0.5,
          longitude: 77.5000 + Math.random() * 0.5
        },
        area: Math.random() * (50 - 5) + 5,
        cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
        soilType: soilTypes[Math.floor(Math.random() * soilTypes.length)],
        waterSource: waterSources[Math.floor(Math.random() * waterSources.length)],
        activeIrrigation: Math.random() > 0.5,
        totalWaterUsed: Math.random() * 50000 + 10000
      },
      {
        farmName: "Harvest Ridge",
        userId: farmers[2]._id,
        location: {
          latitude: 12.7500 + Math.random() * 0.5,
          longitude: 77.4500 + Math.random() * 0.5
        },
        area: Math.random() * (50 - 5) + 5,
        cropType: cropTypes[Math.floor(Math.random() * cropTypes.length)],
        soilType: soilTypes[Math.floor(Math.random() * soilTypes.length)],
        waterSource: waterSources[Math.floor(Math.random() * waterSources.length)],
        activeIrrigation: Math.random() > 0.5,
        totalWaterUsed: Math.random() * 50000 + 10000
      }
    ]

    const createdFarms = []
    for (const farmData of farmDataArray) {
      const farm = new Farm(farmData)
      await farm.save()
      createdFarms.push(farm)
      console.log(`✅ Farm created: ${farm.farmName}`)
      console.log(`   - Location: (${farm.location.latitude.toFixed(4)}, ${farm.location.longitude.toFixed(4)})`)
      console.log(`   - Area: ${farm.area.toFixed(2)} hectares`)
      console.log(`   - Crop: ${farm.cropType}`)
      console.log(`   - Soil: ${farm.soilType}`)
      console.log(`   - Water Source: ${farm.waterSource}`)
    }

    // Add sensor data for each farm
    console.log("\n📊 Adding sensor data...")
    const statuses = ["optimal", "low", "critical"]
    
    for (const farm of createdFarms) {
      const farmer = farmers.find(f => f._id.equals(farm.userId))
      
      // Create 20 sensor readings for each farm
      for (let i = 0; i < 20; i++) {
        const moisture = Math.random() * 100
        const temp = Math.random() * (40 - 15) + 15 // 15-40°C
        const water = Math.random() * 500 + 50 // 50-550L
        
        // Determine status based on moisture
        let status = "optimal"
        if (moisture < 30) status = "critical"
        else if (moisture < 50) status = "low"
        
        const sensor = new Sensor({
          farmId: farm._id,
          userId: farmer._id,
          soilMoisture: moisture,
          temperature: temp,
          humidity: Math.random() * 100,
          waterNeeded: water,
          status: status,
          date: new Date(Date.now() - (20 - i) * 60 * 1000) // Spread over last 20 minutes
        })
        await sensor.save()
      }
      console.log(`✅ Added 20 sensor readings for ${farm.farmName}`)
    }

    console.log("\n🎉 Database seeded successfully!")
    console.log("\n📋 Summary:")
    console.log(`   - Admin users: 1`)
    console.log(`   - Farmers: 3`)
    console.log(`   - Farms: 3 (Bensen, Christy, Basith)`)
    console.log(`   - Total sensor readings: 60`)
    
    console.log("\n🔐 Login credentials:")
    console.log("   Admin: admin / admin123")
    console.log("   Bensen: bensen_farm / password123")
    console.log("   Christy: christy_farm / password123")
    console.log("   Basith: basith_farm / password123")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
