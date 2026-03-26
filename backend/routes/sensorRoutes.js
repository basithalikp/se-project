const router = require("express").Router()
const sensorController = require("../controllers/sensorController")
const { authMiddleware } = require("../middleware/authMiddleware")

router.post("/add", authMiddleware, sensorController.addSensorData)

router.get("/all", sensorController.getSensorData)

router.get("/user-data", authMiddleware, sensorController.getUserSensorData)

router.get("/farm/:farmId", sensorController.getSensorDataByFarm)

router.get("/latest/readings", sensorController.getLatestSensorReadings)

module.exports = router