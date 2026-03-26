# 💧 Water Market Feature Guide

## Overview
The Water Market allows farmers to purchase water using their water credits. Each user starts with a credit balance that can be used to buy water for their farms.

## Default User Balances
- **Each Farmer:** 2,000 credits (or 1,000 - see your database)
- **Admin User:** 5,000 credits
- **Price per Liter:** 5 credits

## How to Use Water Market

### For Farmers:
1. Click on "💧 Water Market" tab in navigation
2. Enter the amount of water you want to buy (in liters)
3. Watch the total cost update automatically:
   - Cost = Amount × 5 credits per liter
4. Click "✅ Buy Water" button to purchase
5. See your remaining balance update instantly
6. Check "📝 Purchase History" table below

### Purchase Validation
Your purchase will be rejected if:
- ❌ Water amount is empty or invalid
- ❌ Water amount is 0 or negative
- ❌ Water amount exceeds 1000 liters per transaction
- ❌ You don't have enough credits

### Examples
- Buy 100L: Costs 500 credits
- Buy 500L: Costs 2,500 credits
- Buy 1000L: Maximum per transaction, costs 5,000 credits

## System Architecture

### Frontend Component: WaterMarket.js
- Real-time balance display
- Water amount input with validation
- Purchase button with loading state
- Success/error message display
- Transaction history table

### Backend Endpoints

#### Get Balance
```
GET /water/balance
Response: {
  waterCredits: 2000,
  pricePerLiter: 5,
  maxPurchasePerTransaction: 1000
}
```

#### Buy Water
```
POST /water/buy
Request: { amount: 100 }
Response: {
  message: "Successfully purchased 100.00L for 500.00 credits",
  waterAmount: 100,
  costInCredits: 500,
  remainingCredits: 1500
}
```

#### Get Transaction History
```
GET /water/history
Response: [
  { date: "2026-03-24", amount: 50, credits: 250, type: "purchase" },
  { date: "2026-03-23", amount: 100, credits: 500, type: "purchase" }
]
```

## API Integration

### Using the Water API:
```javascript
import { waterAPI } from "./api"

// Get balance
const balance = await waterAPI.getBalance()

// Buy water
const result = await waterAPI.buyWater(100)

// Get history
const history = await waterAPI.getTransactionHistory()

// Add credits (admin only)
const added = await waterAPI.addCredits(userId, 500, "Reward")
```

## Validation Rules

### Water Amount Validation
```javascript
- Must be a number
- Must be > 0
- Must be ≤ 1000
- Required credits ≤ user balance
```

### Error Messages
- "Please enter a valid water amount" - Invalid number
- "Water amount must be greater than 0" - Zero or negative
- "Maximum purchase per transaction is 1000 liters" - Exceeds limit
- "Insufficient credits! Need X, have Y" - Not enough credits

## User Interface

### Balance Section
Shows:
- Current available credits (in gold color)
- How many liters you can afford
- Price per liter
- Transaction limits

### Purchase Section
Shows:
- Input field for water amount
- Real-time cost calculation
- Submit button
- Status messages

### Transaction History
Shows:
- Purchase date
- Water amount (liters)
- Cost (credits)
- Transaction type

## For Admin Users

### Additional Privileges
- Cannot add/deduct credits directly from UI (API-only)
- Can monitor all user transactions
- Can refund or reward credits via backend

### API Endpoint (Admin Only)
```
POST /water/add-credits
Request: {
  userId: "user123",
  amount: 500,
  reason: "Reward for feedback"
}
```

## Data Flow

1. **User enters amount** → Real-time validation
2. **User clicks Buy** → Validation check
3. **Valid → API Request** → /water/buy
4. **Backend Processing:**
   - Validate purchase
   - Check balance
   - Deduct credits from user
   - Record transaction
   - Return new balance
5. **Frontend Updates:**
   - Show success message
   - Update balance display
   - Add to transaction history
   - Clear input field
   - Hide message after 3 seconds

## Database Schema

### Users Collection
```javascript
{
  username: String,
  email: String,
  role: "admin" | "farmer",
  waterCredits: Number,  // Default: 1000 (farmer), 5000 (admin)
  // ... other fields
}
```

### Transactions (Optional - Can be implemented)
```javascript
{
  userId: ObjectId,
  type: "water_purchase" | "credit_reward" | "credit_refund",
  amount: Number,          // Liters of water
  cost: Number,            // Credits deducted
  date: Date,
  status: "completed" | "pending" | "failed"
}
```

## Testing Checklist

- [ ] Can view Water Market tab
- [ ] Current balance displays correctly
- [ ] Can enter water amounts
- [ ] Total cost updates in real-time
- [ ] Can purchase water successfully
- [ ] Balance updates after purchase
- [ ] Error messages show for invalid inputs
- [ ] Can't buy more than balance allows
- [ ] Can't buy more than 1000L per transaction
- [ ] Transaction history updates
- [ ] Farmers can't access if not enough credits
- [ ] Admin can't purchase with limited balance

## Troubleshooting

### Balance doesn't show
- Check if user is logged in
- Verify token is valid
- Check backend /water/balance endpoint

### Purchase fails
- Verify you have enough credits
- Check if backend service is running
- See error message in UI for details

### Balance doesn't update
- Refresh the page
- Click "Water Market" tab again
- Check browser console for errors

## Future Enhancements

- [ ] Water package deals (bulk discounts)
- [ ] Monthly water allowances
- [ ] Water trading between users
- [ ] Water conservation rewards
- [ ] Price fluctuation based on demand
- [ ] Automated refills on low water
- [ ] Integration with irrigation system
