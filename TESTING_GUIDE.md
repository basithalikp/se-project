# 🧪 Testing Guide - All Features

## Test Environment Setup

### Prerequisites
- Node.js installed
- MongoDB running
- Backend and Frontend running on ports 5000 and 3000

### Test Users (from seed.js)

**Admin Account:**
- Username: `admin`
- Email: `admin@smartwater.com`
- Password: `Admin@123`
- Initial Credits: 5,000

**Farmer 1:**
- Username: `john_farmer`
- Email: `john@farm.com`
- Password: `Farmer@123`
- Farm: Green Valley
- Initial Credits: 2,000

**Farmer 2:**
- Username: `jane_farmer`
- Email: `jane@farm.com`
- Password: `Farmer@123`
- Farm: Sunset Acres
- Initial Credits: 3,000

**Farmer 3:**
- Username: `bob_farmer`
- Email: `bob@farm.com`
- Password: `Farmer@123`
- Farm: Harvest Ridge
- Initial Credits: 2,500

---

## 🎯 Test Case 1: Text Visibility

**Objective:** Verify chart labels and values are clearly visible

**Steps:**
1. Login as any farmer
2. Navigate to Dashboard tab
3. Look at "Moisture Chart"
4. Verify:
   - [ ] Y-axis labels are clearly visible
   - [ ] X-axis labels are clearly visible
   - [ ] Stat cards show clear values
   - [ ] Gold (#fbbf24) stat values are bright
   - [ ] No text is too small or unclear

**Expected Result:** ✅ All text clear and readable on dark background

---

## 🎯 Test Case 2: Decimal Formatting

**Objective:** Verify all numbers show exactly 2 decimal places

**Steps:**
1. Login as any farmer
2. Go to Dashboard → Moisture Chart
3. Check all statistics section:
   - [ ] Min moisture: X.XX% format
   - [ ] Max moisture: X.XX% format
   - [ ] Avg moisture: X.XX% format
   - [ ] Total water: X.XX L format
4. Check chart values:
   - [ ] Y-axis ticks show 2 decimals
   - [ ] Tooltip values show 2 decimals

**Expected Result:** ✅ All numbers consistently show 2 decimal places

---

## 🎯 Test Case 3: Farm Names

**Objective:** Verify farm names are meaningful

**Steps:**
1. Login as any user
2. Navigate to Map tab
3. Look at farm names on map:
   - [ ] "Green Valley" (was Bensen)
   - [ ] "Sunset Acres" (was Christy)
   - [ ] "Harvest Ridge" (was Basith)

**Expected Result:** ✅ All farms show meaningful names

---

## 🎯 Test Case 4: Water Market - Happy Path

**Objective:** Verify successful water purchase

**Steps:**
1. Login as farmer (e.g., `john_farmer`)
2. Navigate to "💧 Water Market" tab
3. Check balance display:
   - [ ] Shows current credits (e.g., 2000)
   - [ ] Shows price: 5 credits/L
4. Enter water amount: `100`
5. Verify cost calculation:
   - [ ] Shows 500 credits (100 × 5)
6. Click "✅ Buy Water" button
7. Verify:
   - [ ] Success message appears: "✅ Successfully purchased..."
   - [ ] Balance updates: 2000 - 500 = 1500
   - [ ] Transaction added to history
   - [ ] Input field clears
   - [ ] Message disappears after 3 seconds

**Expected Result:** ✅ Water purchased successfully, balance updated

---

## 🎯 Test Case 5: Water Market - Validation Errors

**Objective:** Verify validation prevents invalid purchases

### Test 5.1: Empty Amount
**Steps:**
1. In Water Market, leave amount empty
2. Click "✅ Buy Water"
3. Verify: ❌ "Please enter a valid water amount" error

### Test 5.2: Invalid Number
**Steps:**
1. Enter: `abc`
2. Click "✅ Buy Water"
3. Verify: ❌ "Please enter a valid water amount" error

### Test 5.3: Zero Amount
**Steps:**
1. Enter: `0`
2. Click "✅ Buy Water"
3. Verify: ❌ "Water amount must be greater than 0" error

### Test 5.4: Negative Amount
**Steps:**
1. Enter: `-50`
2. Click "✅ Buy Water"
3. Verify: ❌ "Water amount must be greater than 0" error

### Test 5.5: Exceeds Limit
**Steps:**
1. Enter: `1001`
2. Click "✅ Buy Water"
3. Verify: ❌ "Maximum purchase per transaction is 1000 liters" error

### Test 5.6: Insufficient Credits
**Steps:**
1. Current balance: 2000 credits
2. Enter: `500` (costs 2500)
3. Click "✅ Buy Water"
4. Verify: ❌ "Insufficient credits! Need 2500.00, have 2000.00" error

**Expected Result:** ✅ All validation errors show appropriately

---

## 🎯 Test Case 6: Form Validation - Login

**Objective:** Verify login form validation

### Test 6.1: Empty Email
**Steps:**
1. Leave email empty
2. Enter password: `Password@123`
3. Try to submit
4. Verify: ❌ Error shows "Email is required" + red border

### Test 6.2: Invalid Email
**Steps:**
1. Enter email: `invalid-email`
2. Enter password: `Password@123`
3. Try to submit
4. Verify: ❌ Error shows "Please enter a valid email address" + red border

### Test 6.3: Empty Password
**Steps:**
1. Enter email: `test@test.com`
2. Leave password empty
3. Try to submit
4. Verify: ❌ Error shows "Password is required" + red border

### Test 6.4: Real Login
**Steps:**
1. Enter email: `john@farm.com`
2. Enter password: `Farmer@123`
3. Click Login
4. Verify: ✅ Successfully logs in and navigates to dashboard

**Expected Result:** ✅ All validation errors show, real login works

---

## 🎯 Test Case 7: Form Validation - Registration

**Objective:** Verify registration form validation

### Test 7.1: Invalid Username
**Steps:**
1. Username: `ab` (too short)
2. Verify error: ❌ "Username must be at least 3 characters"

### Test 7.2: Invalid Email
**Steps:**
1. Email: `notanemail`
2. Verify error: ❌ "Please enter a valid email address"

### Test 7.3: Invalid Password
**Steps:**
1. Password: `short` (too short, no uppercase, no number)
2. Verify error: ❌ "Password must be at least 6 characters"

### Test 7.4: Weak Password
**Steps:**
1. Password: `password123` (no uppercase)
2. Verify error: ❌ "Password must contain at least one uppercase letter"

### Test 7.5: Password Mismatch
**Steps:**
1. Password: `Password@123`
2. Confirm: `Password@124`
3. Verify error: ❌ "Passwords do not match"

### Test 7.6: Empty Required Field
**Steps:**
1. Fill all except Farm Name
2. Try to submit
3. Verify error: ❌ "Farm Name is required"

**Expected Result:** ✅ All registration validation works

---

## 🎯 Test Case 8: Admin-Only Access

**Objective:** Verify Stop Server button only for admin

### Test 8.1: Admin Can See Button
**Steps:**
1. Login as admin (`admin@smartwater.com`)
2. Look at header (right side)
3. Verify: ✅ "🛑 Stop Servers" button is visible

### Test 8.2: Farmer Cannot See Button
**Steps:**
1. Logout
2. Login as farmer (`john@farm.com`)
3. Look at header (right side)
4. Verify: ❌ "Stop Servers" button is NOT visible

### Test 8.3: Admin Can Click Button
**Steps:**
1. Login as admin
2. Click "🛑 Stop Servers"
3. Verify: ✅ Confirmation dialog appears

**Expected Result:** ✅ Button only visible and functional for admin

---

## 🎯 Test Case 9: Transaction History

**Objective:** Verify transaction history tracking

**Steps:**
1. Login as farmer
2. Go to Water Market
3. Buy water: 50L (costs 250 credits)
4. Scroll to "📝 Purchase History"
5. Verify:
   - [ ] Today's date appears
   - [ ] 50.00 L shown
   - [ ] 250.00 credits shown
   - [ ] "🛒 Purchase" type shown
6. Buy another amount: 75L (costs 375 credits)
7. Verify:
   - [ ] New transaction appears at top
   - [ ] Both transactions visible in history
   - [ ] Newest first

**Expected Result:** ✅ Transaction history tracks all purchases

---

## 🎯 Test Case 10: Real-Time Updates

**Objective:** Verify real-time cost calculation

**Steps:**
1. In Water Market, watch total cost
2. Enter: `1`
3. Verify: Shows 5.00 credits
4. Change to: `10`
5. Verify: Shows 50.00 credits
6. Change to: `100`
7. Verify: Shows 500.00 credits
8. All updates happen instantly

**Expected Result:** ✅ Cost updates in real-time as amount changes

---

## 📊 Test Summary Checklist

| Test Case | Description | Status |
|-----------|-------------|--------|
| 1 | Text Visibility | ☐ Pass / ☐ Fail |
| 2 | Decimal Formatting | ☐ Pass / ☐ Fail |
| 3 | Farm Names | ☐ Pass / ☐ Fail |
| 4 | Water Purchase Happy Path | ☐ Pass / ☐ Fail |
| 5.1 | Water Validation - Empty | ☐ Pass / ☐ Fail |
| 5.2 | Water Validation - Invalid | ☐ Pass / ☐ Fail |
| 5.3 | Water Validation - Zero | ☐ Pass / ☐ Fail |
| 5.4 | Water Validation - Negative | ☐ Pass / ☐ Fail |
| 5.5 | Water Validation - Limit | ☐ Pass / ☐ Fail |
| 5.6 | Water Validation - Insufficient | ☐ Pass / ☐ Fail |
| 6 | Login Form Validation | ☐ Pass / ☐ Fail |
| 7 | Registration Validation | ☐ Pass / ☐ Fail |
| 8 | Admin-Only Access | ☐ Pass / ☐ Fail |
| 9 | Transaction History | ☐ Pass / ☐ Fail |
| 10 | Real-Time Updates | ☐ Pass / ☐ Fail |

---

## ✅ All Tests Passed? 

If all tests pass:
- ✅ All 6 features working correctly
- ✅ Validation preventing invalid inputs
- ✅ Security controls in place
- ✅ User experience is smooth
- ✅ Ready for production deployment

---

## 🐛 Troubleshooting

### Backend Not Running?
```bash
cd backend
npm install
npm start
```

### Frontend Not Running?
```bash
cd frontend
npm install
npm start
```

### Validation Not Showing?
- Check browser console (F12) for errors
- Verify API calls completing successfully
- Check backend logs

### Water Not Purchased?
- Verify backend /water/buy endpoint
- Check user has sufficient credits
- Check database connection
- Review backend logs for errors

### Database Reset?
```bash
# In backend directory
node seed.js
```

This resets all test data to defaults.
