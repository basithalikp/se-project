import React, { useEffect, useState } from "react"
import { sensorAPI, farmAPI } from "./api"
import "./styles.css"

function Dashboard() {
  const [sensorData, setSensorData] = useState([])
  const [farmsMap, setFarmsMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      // Load farms first to create a map
      const farmsResponse = await farmAPI.getUserFarms()
      const farms = farmsResponse.data
      const farmMap = {}
      farms.forEach((farm) => {
        farmMap[farm._id] = farm.farmName
      })
      setFarmsMap(farmMap)

      // Load sensor data
      const sensorResponse = await sensorAPI.getAllSensors()
      setSensorData(sensorResponse.data)
      setError("")
    } catch (err) {
      setError("Failed to load data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics
  const stats = {
    totalReadings: sensorData.length,
    avgMoisture:
      sensorData.length > 0
        ? (
            sensorData.reduce((sum, d) => sum + d.soilMoisture, 0) /
            sensorData.length
          ).toFixed(2)
        : 0,
    avgTemp:
      sensorData.length > 0
        ? (
            sensorData.reduce((sum, d) => sum + d.temperature, 0) /
            sensorData.length
          ).toFixed(2)
        : 0,
    criticalReadings: sensorData.filter((d) => d.status === "critical").length
  }

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <span style={{ fontSize: "24px" }}>📊</span>
          <div className="stat-label">Total Readings</div>
          <div className="stat-value">{stats.totalReadings}</div>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: "24px" }}>💧</span>
          <div className="stat-label">Avg Soil Moisture</div>
          <div className="stat-value">{stats.avgMoisture}%</div>
        </div>

        <div className="stat-card">
          <span style={{ fontSize: "24px" }}>🌡️</span>
          <div className="stat-label">Avg Temperature</div>
          <div className="stat-value">{stats.avgTemp}°C</div>
        </div>

        <div className="stat-card" style={{ borderLeftColor: "#dc2626" }}>
          <span style={{ fontSize: "24px" }}>⚠️</span>
          <div className="stat-label">Critical Status</div>
          <div className="stat-value" style={{ color: "#dc2626" }}>
            {stats.criticalReadings}
          </div>
        </div>
      </div>

      {/* Sensor Data Table */}
      <div className="card">
        <h2 className="card-title">📈 Farm Sensor Dashboard</h2>

        {loading && sensorData.length === 0 ? (
          <p>Loading sensor data...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Farm Name</th>
                <th>Soil Moisture</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Water Needed</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.length > 0 ? (
                sensorData.map((data) => (
                  <tr key={data._id}>
                    <td>
                      <strong>{farmsMap[data.farmId] || data.farmId?.farmName || "Unknown Farm"}</strong>
                    </td>
                    <td>{data.soilMoisture}%</td>
                    <td>{data.temperature}°C</td>
                    <td>{data.humidity}%</td>
                    <td>{data.waterNeeded}L</td>
                    <td>
                      <span
                        className={`badge badge-${
                          data.status === "critical"
                            ? "danger"
                            : data.status === "low"
                            ? "warning"
                            : "success"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td>{new Date(data.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No sensor data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Dashboard
