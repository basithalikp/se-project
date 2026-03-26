const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "smartwater_secret_key_2026"

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "No token provided" })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    req.userRole = decoded.role
    req.username = decoded.username

    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

exports.adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Admin access required" })
  }
  next()
}
