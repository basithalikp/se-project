const router = require("express").Router()
const tradeController = require("../controllers/tradeController")
const { authMiddleware } = require("../middleware/authMiddleware")

router.post("/create", authMiddleware, tradeController.createTrade)
router.get("/all", tradeController.getTrades)
router.get("/user-trades", authMiddleware, tradeController.getUserTrades)
router.post("/buy/:tradeId", authMiddleware, tradeController.buyTrade)
router.post("/cancel/:tradeId", authMiddleware, tradeController.cancelTrade)
router.get("/history", authMiddleware, tradeController.getTradeHistory)

module.exports = router