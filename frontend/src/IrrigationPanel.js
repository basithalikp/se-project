import React, { useEffect, useState } from "react"
import { sensorAPI, waterAPI } from "./api"
import "./styles.css"

function IrrigationPanel({ user, onWaterUsed }) {
  const [farms, setFarms] = useState([])
  const [irrigationLog, setIrrigationLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [userWaterInventory, setUserWaterInventory] = useState(user?.waterInventory || 0)

  useEffect(() => {
    loadSensorData()
    const interval = setInterval(loadSensorData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadSensorData = async () => {
    try {
      const response = await sensorAPI.getLatestReadings()
      setFarms(response.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const startIrrigation = async (farmId, farmName, waterNeeded) => {
    // ✅ Check if user has enough water
    if (userWaterInventory < waterNeeded) {
      alert(`❌ Insufficient water! Need ${waterNeeded}L, have ${userWaterInventory.toFixed(2)}L`)
      return
    }

    const logEntry = {
      id: Date.now(),
      farmId,
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

    // ✅ Call backend to record transaction (if available)
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

  const stopIrrigation = (logId) => {
    setIrrigationLog((prev) =>
      prev.map((log) =>
        log.id === logId ? { ...log, status: "Stopped" } : log
      )
    )
  }

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
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
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

      {/* Farms needing irrigation */}
      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Farms Status</h3>

        {loading ? (
          <p>Loading farm data...</p>
        ) : farms.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Farm</th>
                <th>Soil Moisture</th>
                <th>Temperature</th>
                <th>Water Needed</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {farms.map((farm) => (
                <tr key={farm._id}>
                  <td>
                    <strong>{farm.farmName || `Farm ${farm._id.substring(0, 8)}`}</strong>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {farm.soilMoisture}%
                      <div
                        style={{
                          height: "20px",
                          width: "100px",
                          background: "#e0e0e0",
                          borderRadius: "3px",
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${farm.soilMoisture}%`,
                            background:
                              farm.soilMoisture < 30
                                ? "#e74c3c"
                                : farm.soilMoisture < 50
                                ? "#f39c12"
                                : "#2ecc71",
                            transition: "width 0.3s"
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{farm.temperature}°C</td>
                  <td>
                    <span className="badge badge-info">{farm.waterNeeded}L</span>
                  </td>
                  <td>
                    <span
                      className={`badge badge-${
                        farm.status === "critical"
                          ? "danger"
                          : farm.status === "low"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {farm.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() =>
                        startIrrigation(farm._id, farm.farmName || `Farm ${farm._id.substring(0, 8)}`, farm.waterNeeded)
                      }
                    >
                      Start Irrigation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No farms available</p>
        )}
      </div>

      {/* Irrigation Log */}
      <div style={{ borderTop: "2px solid #eee", paddingTop: "20px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Irrigation Log</h3>

        {irrigationLog.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Farm</th>
                <th>Water (L)</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {irrigationLog.map((log) => (
                <tr key={log.id}>
                  <td>{log.farmName}</td>
                  <td>{log.waterNeeded}</td>
                  <td>{log.timestamp}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        log.status === "Active"
                          ? "warning"
                          : log.status === "Completed"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td>
                    {log.status === "Active" && (
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => stopIrrigation(log.id)}
                      >
                        Stop
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#666" }}>No irrigation activities yet</p>
        )}
      </div>
    </div>
  )
}

export default IrrigationPanel