const Trade = require("../models/Trade")
const User = require("../models/User")

exports.createTrade = async (req, res) => {

  try {

    const { waterCredits, pricePerCredit } = req.body

    if (!waterCredits || pricePerCredit === undefined) {
      return res.status(400).json({
        message: "Water credits and price per credit are required"
      })
    }

    // Check if user has enough credits
    const user = await User.findById(req.userId)
    if (user.waterCredits < waterCredits) {
      return res.status(400).json({
        message: "Insufficient water credits"
      })
    }

    const totalPrice = waterCredits * pricePerCredit

    const trade = new Trade({
      sellerId: req.userId,
      waterCredits,
      pricePerCredit,
      totalPrice,
      status: "listed"
    })

    await trade.save()

    res.status(201).json({
      message: "Trade listing created successfully",
      trade
    })

  } catch (error) {

    res.status(500).json({
      message: "Error creating trade",
      error: error.message
    })

  }

}

exports.getTrades = async (req, res) => {

  try {

    const trades = await Trade.find({ status: "listed" })
      .populate("sellerId", "username farmName")
      .sort({ createdAt: -1 })

    res.json(trades)

  } catch (error) {

    res.status(500).json({
      message: "Error fetching trades",
      error: error.message
    })

  }

}

exports.getUserTrades = async (req, res) => {

  try {

    const trades = await Trade.find({ sellerId: req.userId })
      .populate("buyerId", "username farmName")
      .sort({ createdAt: -1 })

    res.json(trades)

  } catch (error) {

    res.status(500).json({
      message: "Error fetching trades",
      error: error.message
    })

  }

}

exports.buyTrade = async (req, res) => {

  try {

    const { tradeId } = req.params

    const trade = await Trade.findById(tradeId)
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" })
    }

    if (trade.status !== "listed") {
      return res.status(400).json({ message: "This trade is no longer available" })
    }

    const buyer = await User.findById(req.userId)
    const seller = await User.findById(trade.sellerId)

    // Check if buyer has enough money (assuming waterCredits as currency)
    if (buyer.waterCredits < trade.totalPrice) {
      return res.status(400).json({ message: "Insufficient funds" })
    }

    // Update credits
    buyer.waterCredits -= trade.totalPrice
    seller.waterCredits += trade.totalPrice

    // Update trade
    trade.buyerId = req.userId
    trade.status = "completed"
    trade.transactionDate = new Date()

    await buyer.save()
    await seller.save()
    await trade.save()

    res.json({
      message: "Trade completed successfully",
      trade
    })

  } catch (error) {

    res.status(500).json({
      message: "Error processing trade",
      error: error.message
    })

  }

}

exports.cancelTrade = async (req, res) => {

  try {

    const { tradeId } = req.params

    const trade = await Trade.findById(tradeId)
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" })
    }

    if (trade.sellerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    trade.status = "cancelled"
    await trade.save()

    res.json({
      message: "Trade cancelled successfully",
      trade
    })

  } catch (error) {

    res.status(500).json({
      message: "Error cancelling trade",
      error: error.message
    })

  }

}

exports.getTradeHistory = async (req, res) => {

  try {

    const trades = await Trade.find({
      $or: [
        { sellerId: req.userId },
        { buyerId: req.userId }
      ],
      status: "completed"
    })
      .populate("sellerId", "username farmName")
      .populate("buyerId", "username farmName")
      .sort({ transactionDate: -1 })

    res.json(trades)

  } catch (error) {

    res.status(500).json({
      message: "Error fetching trade history",
      error: error.message
    })

  }

}