import React, { useState, useEffect } from "react"
import "./styles.css"

function WaterMarket({ user }) {
  const [waterAmount, setWaterAmount] = useState("")
  const [waterError, setWaterError] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [sellError, setSellError] = useState("")
  const [waterPrice] = useState(100) // Price per liter in credits
  const [balance, setBalance] = useState(user?.waterCredits || 0)
  const [waterInventory, setWaterInventory] = useState(user?.waterInventory || 0)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [transactionHistory, setTransactionHistory] = useState([])

  useEffect(() => {
    setBalance(user?.waterCredits || 0)
    setWaterInventory(user?.waterInventory || 0)
  }, [user])

  const validateWaterAmount = (value) => {
    if (!value || isNaN(value)) {
      return "❌ Please enter a valid water amount"
    }

    const amount = parseFloat(value)

    if (amount <= 0) {
      return "❌ Water amount must be greater than 0"
    }

    if (amount > 500) {
      return "❌ Maximum purchase per transaction is 500 liters"
    }

    const requiredCredits = amount * waterPrice

    if (requiredCredits > balance) {
      return `❌ Insufficient credits! Need ${requiredCredits.toFixed(0)}, have ${balance.toFixed(0)}`
    }

    return ""
  }

  const validateSellAmount = (value) => {
    if (!value || isNaN(value)) {
      return "❌ Please enter a valid water amount"
    }

    const amount = parseFloat(value)

    if (amount <= 0) {
      return "❌ Water amount must be greater than 0"
    }

    if (amount > 1000) {
      return "❌ Maximum sale per transaction is 1000 liters"
    }

    if (amount > waterInventory) {
      return `❌ You don't have enough water! Have ${waterInventory.toFixed(2)}L, trying to sell ${amount.toFixed(2)}L`
    }

    return ""
  }

  const handleBuyWater = async () => {
    setSellError("")
    const error = validateWaterAmount(waterAmount)
    
    if (error) {
      setWaterError(error)
      setMessage(error)
      setMessageType("error")
      return
    }

    setLoading(true)
    try {
      const amount = parseFloat(waterAmount)
      const costInCredits = amount * waterPrice

      // Deduct credits and add water
      const newBalance = balance - costInCredits
      const newInventory = waterInventory + amount

      setBalance(newBalance)
      setWaterInventory(newInventory)

      // Add to transaction history
      const newTransaction = {
        date: new Date().toISOString().split("T")[0],
        type: "water_purchase",
        liters: amount,
        creditsUsed: costInCredits
      }
      setTransactionHistory([newTransaction, ...transactionHistory])

      setMessage(`✅ Successfully purchased ${amount.toFixed(2)}L for ${costInCredits.toFixed(0)} credits!`)
      setMessageType("success")
      setWaterAmount("")
      setWaterError("")

      setTimeout(() => {
        setMessage("")
      }, 3000)
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Purchase failed. Please try again."
      setMessage(`❌ ${errorMsg}`)
      setMessageType("error")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSellWater = async () => {
    setWaterError("")
    const error = validateSellAmount(sellAmount)
    
    if (error) {
      setSellError(error)
      setMessage(error)
      setMessageType("error")
      return
    }

    setLoading(true)
    try {
      const amount = parseFloat(sellAmount)
      const creditsEarned = amount * waterPrice

      // Add credits and deduct water
      const newBalance = balance + creditsEarned
      const newInventory = waterInventory - amount

      setBalance(newBalance)
      setWaterInventory(newInventory)

      // Add to transaction history
      const newTransaction = {
        date: new Date().toISOString().split("T")[0],
        type: "water_sale",
        liters: amount,
        creditsEarned: creditsEarned
      }
      setTransactionHistory([newTransaction, ...transactionHistory])

      setMessage(`✅ Successfully sold ${amount.toFixed(2)}L for ${creditsEarned.toFixed(0)} credits!`)
      setMessageType("success")
      setSellAmount("")
      setSellError("")

      setTimeout(() => {
        setMessage("")
      }, 3000)
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Sale failed. Please try again."
      setMessage(`❌ ${errorMsg}`)
      setMessageType("error")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const calculateBuyCost = () => {
    if (!waterAmount || isNaN(waterAmount)) return 0
    return (parseFloat(waterAmount) * waterPrice).toFixed(0)
  }

  const calculateSellEarnings = () => {
    if (!sellAmount || isNaN(sellAmount)) return 0
    return (parseFloat(sellAmount) * waterPrice).toFixed(0)
  }

  return (
    <div className="card">
      <h2 className="card-title" style={{ color: "#ffffff", fontSize: "28px", textShadow: "0 0 20px rgba(217, 70, 239, 0.5)" }}>💧 Water Market</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* Balance Section */}
        <div style={{ padding: "20px", backgroundColor: "rgba(236, 72, 153, 0.1)", borderRadius: "12px", border: "2px solid rgba(236, 72, 153, 0.4)" }}>
          <h3 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>💰 Your Balance</h3>

          <div style={{ padding: "15px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "8px", marginBottom: "15px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
            <div style={{ fontSize: "14px", color: "#ffffff", fontWeight: "600", marginBottom: "8px" }}>Available Credits:</div>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#fbbf24", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}>
              {balance.toFixed(0)}
            </div>
            <div style={{ fontSize: "13px", color: "#ffffff", marginTop: "5px", fontWeight: "500" }}>
              Can buy: {(balance / waterPrice).toFixed(2)}L
            </div>
          </div>

          <div style={{ padding: "15px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "8px", marginBottom: "15px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
            <div style={{ fontSize: "14px", color: "#ffffff", fontWeight: "600", marginBottom: "8px" }}>Water Inventory:</div>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#34d399", textShadow: "0 0 10px rgba(52, 211, 153, 0.5)" }}>
              {waterInventory.toFixed(2)}L
            </div>
            <div style={{ fontSize: "13px", color: "#ffffff", marginTop: "5px", fontWeight: "500" }}>
              Can earn: {(waterInventory * waterPrice).toFixed(0)} credits
            </div>
          </div>

          <div style={{ padding: "12px", backgroundColor: "rgba(52, 211, 153, 0.1)", borderRadius: "8px", border: "1px solid rgba(52, 211, 153, 0.3)", fontSize: "13px", color: "#ffffff", fontWeight: "500" }}>
            � Price: {waterPrice} credits/liter
          </div>
        </div>

        {/* Buy Water Section */}
        <div style={{ padding: "20px", backgroundColor: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", border: "2px solid rgba(59, 130, 246, 0.4)" }}>
          <h3 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>🛒 Buy Water</h3>

          <div className="form-group">
            <label className="form-label" style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>Amount (Liters)</label>
            <input
              type="number"
              className={`form-input ${waterError ? "input-error" : ""}`}
              value={waterAmount}
              onChange={(e) => {
                setWaterAmount(e.target.value)
                if (waterError) setWaterError("")
              }}
              placeholder="Enter amount (max 500L)"
              min="0"
              max="500"
              step="0.01"
              style={{ fontSize: "16px", color: "#ffffff", fontWeight: "600" }}
            />
            {waterError && (
              <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px", fontWeight: "600" }}>
                {waterError}
              </div>
            )}
          </div>

          <div style={{ padding: "12px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "8px", marginBottom: "15px", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
            <div style={{ fontSize: "13px", color: "#ffffff", fontWeight: "600", marginBottom: "5px" }}>Total Cost:</div>
            <div style={{ fontSize: "24px", color: "#3b82f6", fontWeight: "700", textShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}>
              {calculateBuyCost()} credits
            </div>
          </div>

          <button
            onClick={handleBuyWater}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.3)",
              border: "2px solid rgba(59, 130, 246, 0.6)",
              color: "#ffffff",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "16px",
              transition: "all 0.3s",
              textShadow: "0 0 5px rgba(59, 130, 246, 0.5)"
            }}
          >
            {loading ? "⏳ Processing..." : "✅ Buy Water"}
          </button>
        </div>

        {/* Sell Water Section */}
        <div style={{ padding: "20px", backgroundColor: "rgba(34, 197, 94, 0.1)", borderRadius: "12px", border: "2px solid rgba(34, 197, 94, 0.4)" }}>
          <h3 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "20px", fontWeight: "bold" }}>📤 Sell Water</h3>

          <div className="form-group">
            <label className="form-label" style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>Amount (Liters)</label>
            <input
              type="number"
              className={`form-input ${sellError ? "input-error" : ""}`}
              value={sellAmount}
              onChange={(e) => {
                setSellAmount(e.target.value)
                if (sellError) setSellError("")
              }}
              placeholder="Enter amount (max 1000L)"
              min="0"
              max="1000"
              step="0.01"
              style={{ fontSize: "16px", color: "#ffffff", fontWeight: "600" }}
            />
            {sellError && (
              <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px", fontWeight: "600" }}>
                {sellError}
              </div>
            )}
          </div>

          <div style={{ padding: "12px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "8px", marginBottom: "15px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
            <div style={{ fontSize: "13px", color: "#ffffff", fontWeight: "600", marginBottom: "5px" }}>You Earn:</div>
            <div style={{ fontSize: "24px", color: "#22c55e", fontWeight: "700", textShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }}>
              {calculateSellEarnings()} credits
            </div>
          </div>

          <button
            onClick={handleSellWater}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0.3)",
              border: "2px solid rgba(34, 197, 94, 0.6)",
              color: "#ffffff",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "16px",
              transition: "all 0.3s",
              textShadow: "0 0 5px rgba(34, 197, 94, 0.5)"
            }}
          >
            {loading ? "⏳ Processing..." : "💰 Sell Water"}
          </button>
        </div>
      </div>

      {message && (
        <div style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: messageType === "success" ? "rgba(46, 213, 115, 0.15)" : "rgba(255, 107, 107, 0.15)",
          border: `2px solid ${messageType === "success" ? "rgba(46, 213, 115, 0.5)" : "rgba(255, 107, 107, 0.5)"}`,
          borderRadius: "8px",
          color: messageType === "success" ? "#34d399" : "#ff6b6b",
          fontSize: "14px",
          fontWeight: "600"
        }}>
          {message}
        </div>
      )}

      {/* Transaction History */}
      <div style={{ marginTop: "30px", paddingTop: "30px", borderTop: "2px solid rgba(217, 70, 239, 0.2)" }}>
        <h3 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "22px", fontWeight: "bold" }}>📝 Transaction History</h3>

        {transactionHistory.length > 0 ? (
          <div style={{ overflowX: "auto", backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "8px", border: "1px solid rgba(217, 70, 239, 0.2)", padding: "0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(217, 70, 239, 0.25)", position: "sticky", top: 0 }}>
                  <th style={{ padding: "15px", textAlign: "left", color: "#ffffff", fontWeight: "bold", fontSize: "15px", borderBottom: "2px solid rgba(217, 70, 239, 0.4)" }}>📅 Date</th>
                  <th style={{ padding: "15px", textAlign: "left", color: "#ffffff", fontWeight: "bold", fontSize: "15px", borderBottom: "2px solid rgba(217, 70, 239, 0.4)" }}>Type</th>
                  <th style={{ padding: "15px", textAlign: "left", color: "#ffffff", fontWeight: "bold", fontSize: "15px", borderBottom: "2px solid rgba(217, 70, 239, 0.4)" }}>Water (L)</th>
                  <th style={{ padding: "15px", textAlign: "left", color: "#ffffff", fontWeight: "bold", fontSize: "15px", borderBottom: "2px solid rgba(217, 70, 239, 0.4)" }}>Credits</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((tx, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "rgba(217, 70, 239, 0.05)" : "rgba(0, 0, 0, 0.1)", borderBottom: "1px solid rgba(217, 70, 239, 0.15)", transition: "background-color 0.2s" }}>
                    <td style={{ padding: "15px", color: "#ffffff", fontSize: "14px", fontWeight: "600" }}>{tx.date}</td>
                    <td style={{ padding: "15px", color: tx.type === "water_purchase" ? "#60a5fa" : "#34d399", fontSize: "14px", fontWeight: "700" }}>
                      {tx.type === "water_purchase" ? "🛒 Buy" : "📤 Sell"}
                    </td>
                    <td style={{ padding: "15px", color: "#e0e7ff", fontSize: "14px", fontWeight: "600" }}>
                      {(tx.liters || tx.amount).toFixed(2)}L
                    </td>
                    <td style={{ padding: "15px", color: tx.type === "water_purchase" ? "#f87171" : "#4ade80", fontSize: "15px", fontWeight: "700" }}>
                      <span style={{ display: "inline-block", minWidth: "40px" }}>{tx.type === "water_purchase" ? "−" : "+"}{(tx.creditsUsed || tx.creditsEarned || tx.credits).toFixed(0)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: "30px", textAlign: "center", color: "#ffffff", fontSize: "16px", fontWeight: "600", backgroundColor: "rgba(217, 70, 239, 0.1)", borderRadius: "8px", border: "2px dashed rgba(217, 70, 239, 0.3)" }}>
            No transactions yet. Start trading water! 🚀
          </div>
        )}
      </div>
    </div>
  )
}

export default WaterMarket
