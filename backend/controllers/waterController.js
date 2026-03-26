const User = require("../models/User")

// Water price constants
const WATER_PRICE_PER_LITER = 5 // 5 credits per liter

// Get user's water credits balance
exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      waterCredits: user.waterCredits,
      pricePerLiter: WATER_PRICE_PER_LITER,
      maxPurchasePerTransaction: 1000
    })
  } catch (err) {
    res.status(500).json({ message: "Error fetching balance", error: err.message })
  }
}

// Buy water
exports.buyWater = async (req, res) => {
  try {
    const { amount } = req.body
    const userId = req.user.id

    // Validation
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid water amount" })
    }

    const waterAmount = parseFloat(amount)

    if (waterAmount <= 0) {
      return res.status(400).json({ message: "Water amount must be greater than 0" })
    }

    if (waterAmount > 1000) {
      return res.status(400).json({ message: "Maximum purchase per transaction is 1000 liters" })
    }

    // Get user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Calculate cost
    const requiredCredits = waterAmount * WATER_PRICE_PER_LITER

    // Check if user has enough credits
    if (user.waterCredits < requiredCredits) {
      return res.status(400).json({
        message: `Insufficient credits. Need ${requiredCredits.toFixed(2)}, have ${user.waterCredits.toFixed(2)}`,
        required: requiredCredits,
        available: user.waterCredits
      })
    }

    // Deduct credits and ADD water to inventory
    user.waterCredits -= requiredCredits
    user.waterInventory = (user.waterInventory || 0) + waterAmount
    await user.save()

    // Record transaction logging (if needed later)
    // For now, just track in user's transaction log

    res.json({
      message: `Successfully purchased ${waterAmount.toFixed(2)}L for ${requiredCredits.toFixed(2)} credits`,
      waterAmount: waterAmount,
      costInCredits: requiredCredits,
      remainingCredits: user.waterCredits,
      waterInventory: user.waterInventory
    })
  } catch (err) {
    res.status(500).json({ message: "Error processing purchase", error: err.message })
  }
}

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id

    // For now, return simulated data
    // In production, query from Transaction collection
    const history = [
      {
        date: new Date().toISOString().split("T")[0],
        amount: 50,
        credits: 250,
        type: "purchase"
      },
      {
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        amount: 30,
        credits: 150,
        type: "purchase"
      }
    ]

    res.json(history)
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err.message })
  }
}

// Add credits (admin only - for rewards/refunds)
exports.addCredits = async (req, res) => {
  try {
    const { userId, amount, reason } = req.body

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.waterCredits += amount
    await user.save()

    res.json({
      message: `Added ${amount} credits to ${user.username}`,
      newBalance: user.waterCredits
    })
  } catch (err) {
    res.status(500).json({ message: "Error adding credits", error: err.message })
  }
}

// Deduct water for irrigation
exports.deductWater = async (req, res) => {
  try {
    const { waterAmount } = req.body
    const userId = req.user.id

    if (!waterAmount || waterAmount <= 0) {
      return res.status(400).json({ message: "Invalid water amount" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user has enough water
    if (!user.waterInventory || user.waterInventory < waterAmount) {
      return res.status(400).json({
        message: `Insufficient water. Need ${waterAmount}L, have ${user.waterInventory || 0}L`,
        available: user.waterInventory || 0,
        needed: waterAmount
      })
    }

    // Deduct water from inventory
    user.waterInventory -= waterAmount
    await user.save()

    res.json({
      message: `Successfully used ${waterAmount}L for irrigation`,
      waterUsed: waterAmount,
      remainingInventory: user.waterInventory
    })
  } catch (err) {
    res.status(500).json({ message: "Error deducting water", error: err.message })
  }
}

// Record irrigation transaction
exports.recordIrrigation = async (req, res) => {
  try {
    const { farmId, farmName, waterUsed } = req.body
    const userId = req.user.id

    if (!waterUsed || waterUsed <= 0) {
      return res.status(400).json({ message: "Invalid water amount" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user has enough water
    if (!user.waterInventory || user.waterInventory < waterUsed) {
      return res.status(400).json({
        message: `Insufficient water for irrigation`,
        available: user.waterInventory || 0,
        needed: waterUsed
      })
    }

    // Deduct water from inventory
    user.waterInventory -= waterUsed
    await user.save()

    res.json({
      message: `Irrigation recorded: ${waterUsed}L used on ${farmName}`,
      waterUsed: waterUsed,
      farmName: farmName,
      farmId: farmId,
      remainingInventory: user.waterInventory,
      timestamp: new Date()
    })
  } catch (err) {
    res.status(500).json({ message: "Error recording irrigation", error: err.message })
  }
}
