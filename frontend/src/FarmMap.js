import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet"
import { farmAPI, sensorAPI } from "./api"
import "./styles.css"
import L from "leaflet"

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
})

function FarmMap() {
  const [farms, setFarms] = useState([])
  const [sensors, setSensors] = useState([])
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState([10.7867, 76.6548])

  useEffect(() => {
    loadFarms()
    loadSensors()
  }, [])

  const loadFarms = async () => {
    try {
      const response = await farmAPI.getUserFarms()
      setFarms(response.data)
      
      // Set map center to first farm if available
      if (response.data.length > 0) {
        const farm = response.data[0]
        setMapCenter([farm.location.latitude, farm.location.longitude])
      }
      setLoading(false)
    } catch (err) {
      console.error("Error loading farms:", err)
      setLoading(false)
    }
  }

  const loadSensors = async () => {
    try {
      const response = await sensorAPI.getLatestReadings()
      setSensors(response.data)
    } catch (err) {
      console.error("Error loading sensors:", err)
    }
  }

  const getSensorByFarmId = (farmId) => {
    return sensors.find((s) => s._id === farmId)
  }

  const getMoistureColor = (moisture) => {
    if (moisture < 30) return "#e74c3c" // Critical - Red
    if (moisture < 50) return "#f39c12" // Low - Orange
    return "#2ecc71" // Optimal - Green
  }

  const getMoistureStatus = (moisture) => {
    if (moisture < 30) return "🔴 Critical"
    if (moisture < 50) return "🟠 Low"
    return "🟢 Optimal"
  }

  return (
    <div className="card">
      <h2 className="card-title">🗺️ Farm Locations & Status</h2>

      {loading ? (
        <p>Loading farm map...</p>
      ) : farms.length > 0 ? (
        <>
          <div
            style={{
              height: "500px",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "20px",
              border: "1px solid #ddd"
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* Render farms as markers */}
              {farms.map((farm) => {
                const sensor = getSensorByFarmId(farm._id)
                // eslint-disable-next-line no-unused-vars
                const moistureColor = sensor
                  ? getMoistureColor(sensor.soilMoisture)
                  : "#95a5a6"

                return (
                  <Marker
                    key={farm._id}
                    position={[farm.location.latitude, farm.location.longitude]}
                  >
                    <Popup>
                      <div style={{ minWidth: "250px" }}>
                        <h3 style={{ marginBottom: "10px" }}>{farm.farmName}</h3>
                        <div style={{ marginBottom: "10px" }}>
                          <strong>Farm Details:</strong>
                          <p>
                            <small>
                              Area: {farm.area} ha | Crop: {farm.cropType}
                            </small>
                          </p>
                          <p>
                            <small>
                              Soil: {farm.soilType} | Water: {farm.waterSource}
                            </small>
                          </p>
                        </div>

                        {sensor ? (
                          <>
                            <strong>Current Status:</strong>
                            <div style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px", marginTop: "8px" }}>
                              <p>
                                💧 Moisture: <strong>{sensor.soilMoisture}%</strong> {getMoistureStatus(sensor.soilMoisture)}
                              </p>
                              <p>
                                🌡️ Temperature: <strong>{sensor.temperature}°C</strong>
                              </p>
                              <p>
                                💦 Water Needed: <strong>{sensor.waterNeeded}L</strong>
                              </p>
                            </div>
                          </>
                        ) : (
                          <p style={{ color: "#999" }}>No sensor data available</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                )
              })}

              {/* Render moisture level as circle markers */}
              {farms.map((farm) => {
                const sensor = getSensorByFarmId(farm._id)
                if (!sensor) return null

                return (
                  <CircleMarker
                    key={`circle-${farm._id}`}
                    center={[farm.location.latitude, farm.location.longitude]}
                    radius={sensor.soilMoisture / 10} // Radius based on moisture
                    pathOptions={{
                      fillColor: getMoistureColor(sensor.soilMoisture),
                      color: getMoistureColor(sensor.soilMoisture),
                      weight: 2,
                      opacity: 0.8,
                      fillOpacity: 0.5
                    }}
                  />
                )
              })}
            </MapContainer>
          </div>

          {/* Farms List */}
          <div style={{ borderTop: "2px solid #eee", paddingTop: "20px" }}>
            <h3 style={{ marginBottom: "15px", fontSize: "16px" }}>📋 Farms Overview</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Farm Name</th>
                  <th>Location</th>
                  <th>Area</th>
                  <th>Crop Type</th>
                  <th>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {farms.map((farm) => {
                  const sensor = getSensorByFarmId(farm._id)
                  return (
                    <tr key={farm._id}>
                      <td>
                        <strong>{farm.farmName}</strong>
                      </td>
                      <td>
                        <small>
                          {farm.location.latitude.toFixed(4)},
                          {farm.location.longitude.toFixed(4)}
                        </small>
                      </td>
                      <td>{farm.area} ha</td>
                      <td>{farm.cropType}</td>
                      <td>
                        {sensor ? (
                          <span
                            className={`badge badge-${
                              sensor.status === "critical"
                                ? "danger"
                                : sensor.status === "low"
                                ? "warning"
                                : "success"
                            }`}
                          >
                            {getMoistureStatus(sensor.soilMoisture)}
                          </span>
                        ) : (
                          <span className="badge badge-info">No Data</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div style={{ borderTop: "2px solid #eee", paddingTop: "15px", marginTop: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>Legend:</h4>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#2ecc71",
                    borderRadius: "50%"
                  }}
                />
                <span>Optimal Moisture (50-100%)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#f39c12",
                    borderRadius: "50%"
                  }}
                />
                <span>Low Moisture (30-50%)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: "#e74c3c",
                    borderRadius: "50%"
                  }}
                />
                <span>Critical Moisture (&lt;30%)</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "#666" }}>
          No farms added yet. Go to Profile to add your first farm.
        </p>
      )}
    </div>
  )
}

export default FarmMap