import React, { useEffect, useState } from "react"
import { tradeAPI, authAPI } from "./api"
import "./styles.css"

function TradeMarket({ user }) {
  const [trades, setTrades] = useState([])
  const [userTrades, setUserTrades] = useState([])
  const [credits, setCredits] = useState(user?.waterCredits || 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("market")

  const [form, setForm] = useState({
    waterCredits: "",
    pricePerCredit: ""
  })

  useEffect(() => {
    loadTrades()
    loadUserTrades()
    loadCredits()
    const interval = setInterval(() => {
      loadTrades()
      loadCredits()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadTrades = async () => {
    try {
      const response = await tradeAPI.getAllTrades()
      setTrades(response.data)
      setError("")
    } catch (err) {
      setError("Failed to load trades")
    }
  }

  const loadUserTrades = async () => {
    try {
      const response = await tradeAPI.getUserTrades()
      setUserTrades(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadCredits = async () => {
    try {
      const response = await authAPI.getCredits()
      setCredits(response.data.waterCredits)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateTrade = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!form.waterCredits || !form.pricePerCredit) {
        setError("Please fill all fields")
        setLoading(false)
        return
      }

      await tradeAPI.createTrade({
        waterCredits: parseInt(form.waterCredits),
        pricePerCredit: parseFloat(form.pricePerCredit)
      })

      setSuccess("Trade listing created successfully!")
      setForm({ waterCredits: "", pricePerCredit: "" })
      loadTrades()
      loadUserTrades()
      setActiveTab("market")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create trade")
    } finally {
      setLoading(false)
    }
  }

  const handleBuyTrade = async (tradeId) => {
    if (window.confirm("Confirm purchase? This will deduct credits from your account.")) {
      try {
        await tradeAPI.buyTrade(tradeId)
        setSuccess("Trade completed successfully!")
        loadTrades()
        loadUserTrades()
        loadCredits()
      } catch (err) {
        setError(err.response?.data?.message || "Failed to complete trade")
      }
    }
  }

  const handleCancelTrade = async (tradeId) => {
    if (window.confirm("Are you sure you want to cancel this listing?")) {
      try {
        await tradeAPI.cancelTrade(tradeId)
        setSuccess("Trade cancelled successfully!")
        loadTrades()
        loadUserTrades()
      } catch (err) {
        setError(err.response?.data?.message || "Failed to cancel trade")
      }
    }
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* User Balance */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Your Water Credits: <span style={{ color: "#2ecc71", fontSize: "24px" }}>{credits} L</span></h3>
          <button
            className="btn btn-secondary"
            onClick={() => setActiveTab(activeTab === "create" ? "market" : "create")}
          >
            {activeTab === "create" ? "Back to Market" : "+ Sell Water"}
          </button>
        </div>
      </div>

      {/* Create Trade Form */}
      {activeTab === "create" && (
        <div className="card">
          <h2 className="card-title">📤 Create Trade Listing</h2>

          <form onSubmit={handleCreateTrade}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Water Credits to Sell</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  value={form.waterCredits}
                  onChange={(e) => setForm({ ...form, waterCredits: e.target.value })}
                  placeholder="Amount of credits"
                  required
                />
                <small style={{ color: "#666" }}>Available: {credits} L</small>
              </div>

              <div className="form-group">
                <label className="form-label">Price per Credit (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  step="0.01"
                  min="0"
                  value={form.pricePerCredit}
                  onChange={(e) => setForm({ ...form, pricePerCredit: e.target.value })}
                  placeholder="Price per liter"
                  required
                />
              </div>
            </div>

            {form.waterCredits && form.pricePerCredit && (
              <div className="stat-card" style={{ marginBottom: "20px" }}>
                <div className="stat-label">Total Trade Value</div>
                <div className="stat-value">
                  ₹ {(form.waterCredits * form.pricePerCredit).toFixed(2)}
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </form>
        </div>
      )}

      {/* Market Listings */}
      {activeTab === "market" && (
        <>
          <div className="card">
            <h2 className="card-title">🏪 Water Trading Marketplace</h2>

            {trades.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Seller</th>
                    <th>Credits (L)</th>
                    <th>Price per L (₹)</th>
                    <th>Total (₹)</th>
                    <th>Listed Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade) => (
                    <tr key={trade._id}>
                      <td>
                        <strong>{trade.sellerId?.username}</strong>
                      </td>
                      <td>{trade.waterCredits}</td>
                      <td>₹{trade.pricePerCredit}</td>
                      <td>₹{trade.totalPrice}</td>
                      <td>{new Date(trade.createdAt).toLocaleDateString()}</td>
                      <td>
                        {trade.sellerId?._id !== user?.id ? (
                          <button
                            className="btn btn-primary btn-small"
                            onClick={() => handleBuyTrade(trade._id)}
                          >
                            Buy
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleCancelTrade(trade._id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: "#666" }}>No active listings in the marketplace</p>
            )}
          </div>

          {/* User's Listings */}
          <div className="card">
            <h2 className="card-title">📋 My Trade Listings</h2>

            {userTrades.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Credits (L)</th>
                    <th>Price per L (₹)</th>
                    <th>Total (₹)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userTrades.map((trade) => (
                    <tr key={trade._id}>
                      <td>{trade.waterCredits}</td>
                      <td>₹{trade.pricePerCredit}</td>
                      <td>₹{trade.totalPrice}</td>
                      <td>
                        <span className="badge badge-info">{trade.status}</span>
                      </td>
                      <td>
                        {trade.status === "listed" && (
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleCancelTrade(trade._id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: "#666" }}>No active listings</p>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default TradeMarket