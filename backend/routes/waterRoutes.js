const express = require("express")
const router = express.Router()
const waterController = require("../controllers/waterController")
const { authMiddleware } = require("../middleware/authMiddleware")

// Get user's balance
router.get("/balance", authMiddleware, waterController.getBalance)

// Buy water
router.post("/buy", authMiddleware, waterController.buyWater)

// Deduct water for irrigation
router.post("/deduct", authMiddleware, waterController.deductWater)

// Record irrigation event
router.post("/record-irrigation", authMiddleware, waterController.recordIrrigation)

// Get transaction history
router.get("/history", authMiddleware, waterController.getTransactionHistory)

// Add credits (admin only)
router.post("/add-credits", authMiddleware, waterController.addCredits)

module.exports = router
