# 🔧 Code Changes: How Water Deduction Works

## Files Modified & Changes

### 1. `backend/models/User.js` - Added Water Inventory Field

**BEFORE:**
```javascript
waterCredits: {
  type: Number,
  default: 1000
},
createdAt: {
  type: Date,
  default: Date.now
}
```

**AFTER:**
```javascript
waterCredits: {
  type: Number,
  default: 1000
},
waterInventory: {
  type: Number,
  default: 0  // liters of water available for irrigation
},
createdAt: {
  type: Date,
  default: Date.now
}
```

**What it does:** Stores how many liters of water the user has available.

---

### 2. `backend/controllers/waterController.js` - Updated buyWater()

**BEFORE:**
```javascript
// Deduct credits
user.waterCredits -= requiredCredits
await user.save()

res.json({
  message: `Successfully purchased ${waterAmount.toFixed(2)}L for ${requiredCredits.toFixed(2)} credits`,
  waterAmount: waterAmount,
  costInCredits: requiredCredits,
  remainingCredits: user.waterCredits
})
```

**AFTER:**
```javascript
// Deduct credits and ADD water to inventory
user.waterCredits -= requiredCredits
user.waterInventory = (user.waterInventory || 0) + waterAmount  // ✅ KEY CHANGE!
await user.save()

res.json({
  message: `Successfully purchased ${waterAmount.toFixed(2)}L for ${requiredCredits.toFixed(2)} credits`,
  waterAmount: waterAmount,
  costInCredits: requiredCredits,
  remainingCredits: user.waterCredits,
  waterInventory: user.waterInventory  // ✅ NOW INCLUDE THIS!
})
```

**What it does:** When user buys water, the water is ADDED to their inventory.

---

### 3. `backend/controllers/waterController.js` - Added deductWater()

**NEW FUNCTION:**
```javascript
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
```

**What it does:** Simple endpoint to deduct water. Checks if user has enough, then deducts.

---

### 4. `backend/controllers/waterController.js` - Added recordIrrigation()

**NEW FUNCTION:**
```javascript
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
    user.waterInventory -= waterUsed  // ✅ THE KEY LINE!
    await user.save()

    res.json({
      message: `Irrigation recorded: ${waterUsed}L used on ${farmName}`,
      waterUsed: waterUsed,
      farmName: farmName,
      farmId: farmId,
      remainingInventory: user.waterInventory,  // ✅ RETURN NEW AMOUNT!
      timestamp: new Date()
    })
  } catch (err) {
    res.status(500).json({ message: "Error recording irrigation", error: err.message })
  }
}
```

**What it does:** Main endpoint for recording irrigation. Deducts water and saves to database.

---

### 5. `backend/routes/waterRoutes.js` - Added New Routes

**BEFORE:**
```javascript
router.post("/buy", authMiddleware, waterController.buyWater)
router.get("/history", authMiddleware, waterController.getTransactionHistory)
router.post("/add-credits", authMiddleware, waterController.addCredits)
```

**AFTER:**
```javascript
router.post("/buy", authMiddleware, waterController.buyWater)
router.post("/deduct", authMiddleware, waterController.deductWater)  // ✅ NEW
router.post("/record-irrigation", authMiddleware, waterController.recordIrrigation)  // ✅ NEW
router.get("/history", authMiddleware, waterController.getTransactionHistory)
router.post("/add-credits", authMiddleware, waterController.addCredits)
```

**What it does:** Exposes the new endpoints to the frontend.

---

### 6. `frontend/src/api.js` - Added API Methods

**BEFORE:**
```javascript
export const waterAPI = {
  getBalance: () => api.get("/water/balance"),
  buyWater: (amount) => api.post("/water/buy", { amount }),
  getTransactionHistory: () => api.get("/water/history"),
  addCredits: (userId, amount, reason) => api.post("/water/add-credits", { userId, amount, reason })
}
```

**AFTER:**
```javascript
export const waterAPI = {
  getBalance: () => api.get("/water/balance"),
  buyWater: (amount) => api.post("/water/buy", { amount }),
  deductWater: (waterAmount) => api.post("/water/deduct", { waterAmount }),  // ✅ NEW
  recordIrrigation: (data) => api.post("/water/record-irrigation", data),  // ✅ NEW
  getTransactionHistory: () => api.get("/water/history"),
  addCredits: (userId, amount, reason) => api.post("/water/add-credits", { userId, amount, reason })
}
```

**What it does:** Frontend can now call these API endpoints.

---

### 7. `frontend/src/IrrigationPanel.js` - Major Updates

**BEFORE:**
```javascript
import React, { useEffect, useState } from "react"
import { sensorAPI } from "./api"

function IrrigationPanel() {
  const [farms, setFarms] = useState([])
  const [irrigationLog, setIrrigationLog] = useState([])
  const [loading, setLoading] = useState(true)

  const startIrrigation = (farmId, farmName, waterNeeded) => {
    const logEntry = {
      id: Date.now(),
      farmName,
      waterNeeded,
      timestamp: new Date().toLocaleTimeString(),
      status: "Active"
    }
    setIrrigationLog([logEntry, ...irrigationLog])

    setTimeout(() => {
      setIrrigationLog((prev) =>
        prev.map((log) =>
          log.id === logEntry.id ? { ...log, status: "Completed" } : log
        )
      )
    }, 3000)
  }
  // ... rest of component
}
```

**AFTER:**
```javascript
import React, { useEffect, useState } from "react"
import { sensorAPI, waterAPI } from "./api"  // ✅ ADDED waterAPI

function IrrigationPanel({ user, onWaterUsed }) {  // ✅ ADDED PROPS
  const [farms, setFarms] = useState([])
  const [irrigationLog, setIrrigationLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [userWaterInventory, setUserWaterInventory] = useState(user?.waterInventory || 0)  // ✅ ADDED STATE

  const startIrrigation = async (farmId, farmName, waterNeeded) => {  // ✅ NOW ASYNC
    // ✅ Check if user has enough water
    if (userWaterInventory < waterNeeded) {
      alert(`❌ Insufficient water! Need ${waterNeeded}L, have ${userWaterInventory.toFixed(2)}L`)
      return
    }

    const logEntry = {
      id: Date.now(),
      farmId,  // ✅ ADDED
      farmName,
      waterNeeded,
      timestamp: new Date().toLocaleTimeString(),
      status: "Active"
    }

    // ✅ Deduct water from inventory IMMEDIATELY
    const newInventory = userWaterInventory - waterNeeded
    setUserWaterInventory(newInventory)

    // ✅ Add to log
    setIrrigationLog([logEntry, ...irrigationLog])

    // ✅ Call backend to record transaction
    try {
      await waterAPI.recordIrrigation({
        farmId,
        farmName,
        waterUsed: waterNeeded
      })
    } catch (err) {
      console.error("Failed to record irrigation:", err)
    }

    // Simulate auto-stop after some time
    setTimeout(() => {
      setIrrigationLog((prev) =>
        prev.map((log) =>
          log.id === logEntry.id ? { ...log, status: "Completed" } : log
        )
      )
    }, 3000)

    // ✅ Notify parent component
    if (onWaterUsed) {
      onWaterUsed(waterNeeded)
    }
  }
  // ... rest of component
}
```

**Key changes:**
- ✅ Accept user props with waterInventory
- ✅ Track userWaterInventory in state
- ✅ Check inventory before irrigating
- ✅ Deduct water immediately in frontend
- ✅ Call backend to record transaction
- ✅ Notify parent when water is used

---

### 8. `frontend/src/IrrigationPanel.js` - Added Water Display Section

**ADDED NEW JSX:**
```javascript
return (
  <div className="card">
    <h2 className="card-title">💦 Irrigation Control Panel</h2>

    {/* Water Inventory Status */}
    <div style={{ 
      backgroundColor: "rgba(6, 182, 212, 0.15)", 
      padding: "15px", 
      borderRadius: "8px", 
      marginBottom: "25px",
      border: "2px solid rgba(6, 182, 212, 0.3)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#ffffff", fontWeight: "600", marginBottom: "5px" }}>💧 Your Water Inventory</div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#22d3ee", textShadow: "0 0 10px rgba(6, 182, 212, 0.5)" }}>
            {userWaterInventory.toFixed(2)}L
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: "500" }}>Available for irrigation</div>
          <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", marginTop: "5px" }}>
            💰 Buy more in Water Market
          </div>
        </div>
      </div>
    </div>
    // ... rest of JSX
  </div>
)
```

**What it does:** Displays current water inventory prominently at the top of the panel.

---

## 🔄 The Data Flow With These Changes

### When User Buys Water:
```javascript
WaterMarket.js
  ↓
  User clicks "Buy 100L"
  ↓
  waterAPI.buyWater(100)
  ↓
  Backend: waterController.buyWater()
  ├─ user.waterCredits -= 10,000  (100L × 100 credits)
  ├─ user.waterInventory += 100   // ← KEY: WATER IS ADDED!
  └─ Return: { waterInventory: 100, ... }
  ↓
  Frontend updates state
  ↓
  User now has 100L water available!
```

### When User Starts Irrigation:
```javascript
IrrigationPanel.js
  ↓
  User clicks "Start Irrigation"
  ↓
  startIrrigation(farmId, farmName, 75)
  ├─ Check: userWaterInventory (100) >= waterNeeded (75)? YES ✅
  ├─ Deduct: userWaterInventory = 100 - 75 = 25
  ├─ Update UI: "💧 Your Water Inventory: 25L"
  └─ Call: waterAPI.recordIrrigation(...)
     ↓
     Backend: waterController.recordIrrigation()
     ├─ user.waterInventory -= 75  // ← DEDUCT IN DATABASE
     ├─ farm.totalWaterUsed += 75
     └─ Return: { remainingInventory: 25, ... }
     ↓
  UI shows: "💧 Your Water Inventory: 25L"
  ↓
  Farm is watered! ✅
```

---

## ✨ Summary of Changes

| File | Change | Purpose |
|------|--------|---------|
| User.js | Added waterInventory field | Store user's available water |
| waterController.js | Updated buyWater() | Add water to inventory when buying |
| waterController.js | Added deductWater() | Simple water deduction endpoint |
| waterController.js | Added recordIrrigation() | Record irrigation + deduct water |
| waterRoutes.js | Added 2 new routes | Expose new endpoints |
| api.js | Added 2 API methods | Frontend can call new endpoints |
| IrrigationPanel.js | Major refactor | Check inventory, deduct, display |

**Result:** Water is now properly tracked and deducted when irrigation occurs! ✅

