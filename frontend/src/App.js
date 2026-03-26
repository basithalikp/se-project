import React, { useState, useEffect } from "react"
import Dashboard from "./Dashboard"
import MoistureChart from "./MoistureChart"
import FarmMap from "./FarmMap"
import IrrigationPanel from "./IrrigationPanel"
import TradeMarket from "./TradeMarket"
import WaterMarket from "./WaterMarket"
import Login from "./Login"
import Profile from "./Profile"
import { reinitBorderGlow } from "./borderGlow"
import "./styles.css"
import "./visibility.css"

function App(){

  const [userRole, setUserRole] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [activeTab, setActiveTab] = useState("dashboard")

  // Initialize border glow effect when component mounts and when tab changes
  useEffect(() => {
    reinitBorderGlow()
  }, [activeTab])

  if (!token || !userRole) {
    return <Login setUserRole={setUserRole} setUser={setUser} setToken={setToken} />
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUserRole(null)
    setUser(null)
  }

  const handleStopServers = () => {
    const confirmed = window.confirm(
      "⚠️ Stop All Servers?\n\nThis will:\n- Close backend (Port 5000)\n- Close frontend (Port 3000)\n\nAre you sure?"
    )
    
    if (confirmed) {
      // Show stopping message
      alert("🛑 Stopping servers...\n\nThe terminal windows will close automatically.")
      
      // Try to stop backend
      fetch("http://localhost:5000/stop", { method: "POST" }).catch(() => {})
      
      // Close current window after a delay
      setTimeout(() => {
        window.close()
      }, 1000)
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1>💧 Smart Water Management System</h1>
        <div className="user-info">
          <span className="user-badge">
            {user?.username} ({userRole})
          </span>
          {userRole === "admin" && (
            <button 
              className="btn btn-secondary btn-small" 
              onClick={handleStopServers}
              title="Stop all servers and close application (Admin Only)"
            >
              🛑 Stop Servers
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="navigation">
        <div className="nav-container">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`nav-tab ${activeTab === "dashboard" ? "active" : ""}`}
          >
            📊 Dashboard
          </button>
          {userRole === "admin" && (
            <button
              onClick={() => setActiveTab("analytics")}
              className={`nav-tab ${activeTab === "analytics" ? "active" : ""}`}
            >
              📈 Analytics
            </button>
          )}
          <button
            onClick={() => setActiveTab("irrigation")}
            className={`nav-tab ${activeTab === "irrigation" ? "active" : ""}`}
          >
            💨 Irrigation
          </button>
          <button
            onClick={() => setActiveTab("trade")}
            className={`nav-tab ${activeTab === "trade" ? "active" : ""}`}
          >
            🏪 Trade Market
          </button>
          <button
            onClick={() => setActiveTab("water")}
            className={`nav-tab ${activeTab === "water" ? "active" : ""}`}
          >
            💧 Water Market
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`nav-tab ${activeTab === "map" ? "active" : ""}`}
          >
            🗺️ Farm Map
          </button>
          <button
            onClick={() => setActiveTab("chart")}
            className={`nav-tab ${activeTab === "chart" ? "active" : ""}`}
          >
            📉 Analytics
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`nav-tab ${activeTab === "profile" ? "active" : ""}`}
          >
            👤 Profile
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {userRole === "admin" && <Dashboard />}
            <MoistureChart />
            <FarmMap />
          </>
        )}

        {/* Analytics Tab (Admin Only) */}
        {activeTab === "analytics" && userRole === "admin" && (
          <div className="card">
            <h2 className="card-title">📊 Analytics & Reports</h2>
            <p>Coming soon - Advanced analytics and reporting features</p>
          </div>
        )}

        {/* Irrigation Tab */}
        {activeTab === "irrigation" && <IrrigationPanel />}

        {/* Trade Tab */}
        {activeTab === "trade" && <TradeMarket user={user} />}

        {/* Water Market Tab */}
        {activeTab === "water" && <WaterMarket user={user} />}

        {/* Map Tab */}
        {activeTab === "map" && <FarmMap />}

        {/* Chart Tab */}
        {activeTab === "chart" && <MoistureChart />}

        {/* Profile Tab */}
        {activeTab === "profile" && <Profile user={user} />}
      </div>
    </div>
  )
}

export default App