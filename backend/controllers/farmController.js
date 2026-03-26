const Farm = require("../models/Farm")

exports.createFarm = async (req, res) => {
  try {
    const { farmName, latitude, longitude, area, cropType, soilType, waterSource } = req.body

    if (!farmName || !latitude || !longitude || !area || !cropType) {
      return res.status(400).json({
        message: "Farm name, location, area, and crop type are required"
      })
    }

    const farm = new Farm({
      userId: req.userId,
      farmName,
      location: { latitude, longitude },
      area,
      cropType,
      soilType,
      waterSource
    })

    await farm.save()

    res.status(201).json({
      message: "Farm created successfully",
      farm
    })
  } catch (error) {
    res.status(500).json({
      message: "Error creating farm",
      error: error.message
    })
  }
}

exports.getUserFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.userId })
    res.json(farms)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching farms",
      error: error.message
    })
  }
}

exports.getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId)
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" })
    }
    res.json(farm)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching farm",
      error: error.message
    })
  }
}

exports.updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId)
    
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" })
    }

    if (farm.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const updatedFarm = await Farm.findByIdAndUpdate(
      req.params.farmId,
      req.body,
      { new: true }
    )

    res.json({
      message: "Farm updated successfully",
      farm: updatedFarm
    })
  } catch (error) {
    res.status(500).json({
      message: "Error updating farm",
      error: error.message
    })
  }
}

exports.deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId)
    
    if (!farm) {
      return res.status(404).json({ message: "Farm not found" })
    }

    if (farm.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    await Farm.findByIdAndDelete(req.params.farmId)

    res.json({ message: "Farm deleted successfully" })
  } catch (error) {
    res.status(500).json({
      message: "Error deleting farm",
      error: error.message
    })
  }
}

exports.getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find().populate("userId", "username farmName")
    res.json(farms)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching farms",
      error: error.message
    })
  }
}
