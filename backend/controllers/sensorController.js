const Sensor = require("../models/Sensor")
const Farm = require("../models/Farm")

// Add new sensor data and calculate water requirement
exports.addSensorData = async (req, res) => {

    try {

        const { farmId, soilMoisture, temperature, humidity } = req.body

        // Verify farm exists and belongs to user
        const farm = await Farm.findById(farmId)
        if (!farm) {
            return res.status(404).json({ message: "Farm not found" })
        }

        let waterNeeded
        let status = "optimal"

        if (soilMoisture < 30) {
            waterNeeded = 1000
            status = "critical"
        } 
        else if (soilMoisture < 50) {
            waterNeeded = 500
            status = "low"
        } 
        else {
            waterNeeded = 0
            status = "optimal"
        }

        const sensor = new Sensor({
            farmId,
            userId: req.userId,
            soilMoisture,
            temperature,
            humidity: humidity || 0,
            waterNeeded,
            status
        })

        await sensor.save()

        res.json({
            message: "Sensor stored successfully",
            waterRecommendation: waterNeeded,
            status,
            data: sensor
        })

    } catch (error) {

        res.status(500).json({
            message: "Error storing sensor data",
            error: error.message
        })

    }

}


// Get all sensor data
exports.getSensorData = async (req, res) => {

    try {

        const data = await Sensor.find()
            .populate("farmId", "farmName location")
            .populate("userId", "username")

        res.json(data)

    } catch (error) {

        res.status(500).json({
            message: "Error fetching sensor data",
            error: error.message
        })

    }

}

// Get sensor data for user's farms
exports.getUserSensorData = async (req, res) => {

    try {

        const data = await Sensor.find({ userId: req.userId })
            .populate("farmId", "farmName location")
            .sort({ date: -1 })

        res.json(data)

    } catch (error) {

        res.status(500).json({
            message: "Error fetching sensor data",
            error: error.message
        })

    }

}

// Get sensor data by farm
exports.getSensorDataByFarm = async (req, res) => {

    try {

        const { farmId } = req.params

        const data = await Sensor.find({ farmId })
            .sort({ date: -1 })
            .limit(100)

        res.json(data)

    } catch (error) {

        res.status(500).json({
            message: "Error fetching sensor data",
            error: error.message
        })

    }

}

// Get latest sensor reading for each farm
exports.getLatestSensorReadings = async (req, res) => {

    try {

        const data = await Sensor.aggregate([
            { $sort: { date: -1 } },
            { $group: {
                _id: "$farmId",
                soilMoisture: { $first: "$soilMoisture" },
                temperature: { $first: "$temperature" },
                humidity: { $first: "$humidity" },
                waterNeeded: { $first: "$waterNeeded" },
                status: { $first: "$status" },
                date: { $first: "$date" }
            }}
        ])

        res.json(data)

    } catch (error) {

        res.status(500).json({
            message: "Error fetching sensor data",
            error: error.message
        })

    }

}