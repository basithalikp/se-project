const User = require("../models/User")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "smartwater_secret_key_2026"

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, farmName, location } = req.body

    // Validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: "Username, email, password, and role are required"
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or username already exists"
      })
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      role,
      farmName: farmName || "",
      location: location || ""
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        farmName: user.farmName
      }
    })
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        farmName: user.farmName,
        waterCredits: user.waterCredits
      }
    })
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message
    })
  }
}

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { farmName, location, phoneNumber } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { farmName, location, phoneNumber },
      { new: true }
    ).select("-password")

    res.json({
      message: "Profile updated successfully",
      user
    })
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message
    })
  }
}

exports.getWaterCredits = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json({ waterCredits: user.waterCredits })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching water credits",
      error: error.message
    })
  }
}
