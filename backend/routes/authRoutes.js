const router = require("express").Router()
const authController = require("../controllers/authController")
const { authMiddleware } = require("../middleware/authMiddleware")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/profile", authMiddleware, authController.getProfile)
router.put("/profile", authMiddleware, authController.updateProfile)
router.get("/credits", authMiddleware, authController.getWaterCredits)

module.exports = router
