# 💦 Irrigation Water System - How It Works

## Overview
The irrigation system is designed to help farmers manage water usage for their farms. It tracks soil moisture, calculates water needs, and allows farmers to control irrigation events.

---

## 🔄 Water Flow in Irrigation

### Where Water Comes From
**The water used in irrigation comes from the farmer's water inventory** (`waterInventory` field in the User model).

1. **Water Purchase**
   - Farmer buys water from the **Water Market** (WaterMarket.js)
   - Costs: **100 credits per liter** 
   - This water is added to their `waterInventory`
   - Location: Dashboard → Water Market → Buy Water section

2. **Water Storage**
   - Purchased water is stored in the user's account as `waterInventory`
   - This is the "tank" or supply available for irrigation

### How Irrigation Uses Water
1. **Start Irrigation** on IrrigationPanel
   - Click "Start Irrigation" on a farm
   - Water amount needed is calculated based on soil moisture
   - Default: The system logs the irrigation event (3-second simulation)
   - **Backend Integration** (when fully connected):
     - Water would be deducted from `user.waterInventory`
     - `farm.totalWaterUsed` would be incremented
     - A transaction record would be created

2. **Water Calculation**
   - Based on **soil moisture percentage**
   - Farms with moisture < 30% are **critical** (high water need)
   - Farms with moisture 30-50% are **low** (medium water need)
   - Farms with moisture > 50% are **optimal** (low water need)
   - Formula: `waterNeeded = (100 - soilMoisture) × farmArea / 10`

### Water Sources (Farm Setting)
Each farm has a **waterSource** property that describes where the farm gets water:
- **Well** - Private well on the property
- **Borewell** - Deep underground water source
- **Canal** - Irrigation canal or public water system
- **Pond** - Rainfall collection pond
- **Underground** - Groundwater system

**Note**: In the current system, this is informational. All irrigation water comes from the farmer's purchased inventory.

---

## 📊 Water Tracking

### User Model Fields
```javascript
waterCredits: 1000,        // Available credits (for buying)
waterInventory: 50,        // Available water in liters (for irrigation)
waterPurchaseHistory: []   // Track of all purchases
```

### Farm Model Fields
```javascript
totalWaterUsed: 45000,     // Total liters used historically
activeIrrigation: true,    // Is irrigation currently running?
waterSource: "well"        // Type of source (informational)
```

### Transaction Types
1. **water_purchase** - Buying water from marketplace
   - Deducts credits, adds to waterInventory
   - Cost: 100 credits per liter

2. **water_sale** - Selling excess water
   - Adds credits, removes from waterInventory
   - Revenue: 100 credits per liter

3. **irrigation** - Using water on a farm
   - Deducts from waterInventory
   - Increases farm.totalWaterUsed
   - *(Currently simulated in frontend)*

---

## 🌾 How Irrigation Panel Works

### Step-by-Step
1. **View Farm Status**
   - See list of all your farms
   - Check soil moisture % for each
   - See water needed (in liters)
   - View critical/low/optimal status badge

2. **Start Irrigation**
   - Click "Start Irrigation" button on any farm
   - System deducts calculated water amount from your inventory
   - Irrigation log records the event
   - Status changes: Active → (after 3 sec) → Completed

3. **Monitor Irrigation Log**
   - Shows all irrigation events
   - Displays farm name, water amount, timestamp, status
   - Can stop active irrigation with "Stop" button

---

## 💡 Complete Water Flow Example

### Scenario: Farmer wants to irrigate
```
1. PURCHASE WATER
   └─ Go to Water Market → Buy Water
   └─ Enter: 100 liters
   └─ Cost: 100 × 100 = 10,000 credits
   └─ Result: waterInventory increases by 100L

2. CHECK FARM STATUS
   └─ Go to Irrigation Panel
   └─ View "Green Valley Farm" 
   └─ Soil moisture: 25% (CRITICAL)
   └─ Water needed: 75L

3. START IRRIGATION
   └─ Click "Start Irrigation" button
   └─ Water deducted: 75L from inventory (25L remains)
   └─ Log entry created: "Green Valley Farm - 75L - Active"
   └─ After 3 seconds: Status changes to "Completed"

4. RESULT
   └─ Farm watered ✅
   └─ Water inventory: 25L remaining
   └─ Farm moisture: Increases toward optimal
   └─ Transaction recorded: "irrigation" type

5. TRACK USAGE
   └─ View transaction history in Water Market
   └─ See: "Green Valley Farm - 75L - Irrigation"
   └─ Farm stats show totalWaterUsed increased by 75L
```

---

## 🔧 Technical Architecture

### Component Flow
```
IrrigationPanel.js (Frontend)
    ↓
    ├─ Fetches: sensorAPI.getLatestReadings()
    │   └─ Shows farms with moisture/temp/water needed
    │
    ├─ User clicks "Start Irrigation"
    │   └─ Calls: startIrrigation(farmId, farmName, waterNeeded)
    │   └─ Updates waterInventory in state
    │   └─ Logs event to irrigationLog
    │
    └─ Should call: waterAPI.deductWater(amount)
        └─ Backend: waterController.deductWater()
        └─ Reduces: user.waterInventory
        └─ Increments: farm.totalWaterUsed
        └─ Creates: transaction record
```

### Database Flow
```
User Model
├─ waterCredits: 1000
├─ waterInventory: 50L
└─ waterPurchaseHistory[]

Farm Model
├─ farmName: "Green Valley"
├─ totalWaterUsed: 45000L
├─ activeIrrigation: true
└─ waterSource: "borewell"

Transaction Model (for history)
├─ type: "water_purchase" | "water_sale" | "irrigation"
├─ amount: 100 (liters/credits)
├─ timestamp: Date
└─ farmId: ObjectId (if irrigation)
```

---

## 🎯 Key Points to Remember

✅ **Water Must Be Purchased First**
- You cannot irrigate if waterInventory is empty
- Buy water from Water Market using credits

✅ **Water Inventory vs Credits**
- Credits = Money to buy water
- Inventory = Actual water available for use
- 100 credits = 1 liter of water

✅ **Farm Water Sources Are Informational**
- They don't affect irrigation mechanics
- They're metadata about the farm's primary source

✅ **Irrigation is User-Initiated**
- Not automatic - farmer must click "Start Irrigation"
- System doesn't auto-irrigate when moisture is low

✅ **Water Usage is Permanent**
- Once used for irrigation, it's gone from inventory
- It increases farm's historical total usage
- Can be tracked in transaction history

---

## 📋 Farm Names - How They're Generated

### Current Setup
Each farm has a **farmName** field set during creation:
- Registration: Farmer enters farm name when signing up
- Profile: Farmer can add additional farms with custom names
- Database: Farm names are stored in Farm.farmName

### Example Farm Names (Seeded)
- ✅ "Green Valley" - Farmer 1
- ✅ "Sunset Acres" - Farmer 2  
- ✅ "Harvest Ridge" - Farmer 3

### Why Names Seem Random
If you're seeing random names like "Farm ObjectId":
1. **Frontend displays Farm._id instead of farmName**
   - Issue in IrrigationPanel.js line 81: `Farm {farm._id}`
   - Should be: `Farm {farm.farmName}`

2. **Farm not created properly**
   - No farmName provided during creation
   - Database returned incomplete farm object

### Solution: Fix Farm Display
The farm names ARE stored correctly in the database, but the **IrrigationPanel.js** is displaying the ID instead of the name.

---

## 🔗 Related Components

- **WaterMarket.js** - Buy/Sell water
- **IrrigationPanel.js** - Control irrigation
- **Profile.js** - Create/manage farms
- **Dashboard.js** - View statistics
- **MoistureChart.js** - Visualize water data

---

**Questions?** Check the component files or review the backend controllers for detailed implementation.
