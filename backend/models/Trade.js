const mongoose = require("mongoose")

const TradeSchema = new mongoose.Schema({

sellerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},

buyerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false
},

waterCredits: {
  type: Number,
  required: true,
  min: 1
},

pricePerCredit: {
  type: Number,
  required: true,
  min: 0
},

totalPrice: {
  type: Number,
  required: true
},

status: {
  type: String,
  enum: ["listed", "pending", "completed", "cancelled"],
  default: "listed"
},

transactionDate: {
  type: Date,
  default: null
},

createdAt: {
  type: Date,
  default: Date.now
}

})

module.exports = mongoose.model("Trade", TradeSchema)