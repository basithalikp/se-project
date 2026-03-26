const router = require("express").Router()
const farmController = require("../controllers/farmController")
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware")

// User farm management
router.post("/", authMiddleware, farmController.createFarm)
router.get("/user-farms", authMiddleware, farmController.getUserFarms)
router.get("/:farmId", farmController.getFarmById)
router.put("/:farmId", authMiddleware, farmController.updateFarm)
router.delete("/:farmId", authMiddleware, farmController.deleteFarm)

// Admin view all farms
router.get("/admin/all-farms", authMiddleware, adminOnly, farmController.getAllFarms)

module.exports = router
