import React, { useEffect, useState } from "react"
import { sensorAPI } from "./api"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import "./styles.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function MoistureChart() {
  const [sensorData, setSensorData] = useState([])
  const [chartType, setChartType] = useState("moisture")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSensorData()
    const interval = setInterval(loadSensorData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadSensorData = async () => {
    try {
      const response = await sensorAPI.getAllSensors()
      setSensorData(response.data.slice(-20)) // Last 20 readings
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const moistureData = {
    labels: sensorData.map((d, idx) => `Reading ${idx + 1}`),
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: sensorData.map((d) => d.soilMoisture),
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.2)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#06b6d4",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        segment: {
          borderColor: "rgba(6, 182, 212, 0.8)"
        }
      }
    ]
  }

  const temperatureData = {
    labels: sensorData.map((d, idx) => `Reading ${idx + 1}`),
    datasets: [
      {
        label: "Temperature (°C)",
        data: sensorData.map((d) => d.temperature),
        borderColor: "#ff6b6b",
        backgroundColor: "rgba(255, 107, 107, 0.2)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#ff6b6b",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        segment: {
          borderColor: "rgba(255, 107, 107, 0.8)"
        }
      }
    ]
  }

  const waterData = {
    labels: sensorData.map((d, idx) => `Reading ${idx + 1}`),
    datasets: [
      {
        label: "Water Needed (L)",
        data: sensorData.map((d) => d.waterNeeded),
        backgroundColor: [
          "rgba(46, 204, 113, 0.7)",
          "rgba(46, 204, 113, 0.6)",
          "rgba(46, 204, 113, 0.5)"
        ],
        borderColor: "#2ecc71",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(46, 204, 113, 0.9)"
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#ffffff",
          font: {
            size: 16,
            weight: "700",
            family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          },
          padding: 25,
          usePointStyle: true,
          pointStyle: "circle",
          margin: 25,
          boxWidth: 20,
          boxHeight: 20,
          generateLabels: function(chart) {
            const datasets = chart.data.datasets
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor || dataset.backgroundColor,
              hidden: !chart.isDatasetVisible(i),
              index: i,
              strokeStyle: '#ffffff',
              lineWidth: 2
            }))
          }
        },
        backgroundColor: "rgba(26, 14, 46, 0.95)",
        borderColor: "rgba(168, 85, 247, 0.8)",
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        fullSize: true,
        reverse: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(15, 30, 55, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(181, 101, 216, 0.4)",
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 15,
          weight: "700"
        },
        bodyFont: {
          size: 14
        },
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 8,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += Number(context.parsed.y).toFixed(2)
            }
            return label
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: chartType === "moisture" ? 100 : undefined,
        ticks: {
          color: "#ffffff",
          font: {
            size: 16,
            weight: "700"
          },
          padding: 12,
          callback: function(value) {
            return value.toFixed(2)
          }
        },
        grid: {
          color: "rgba(217, 70, 239, 0.15)",
          drawBorder: true,
          borderColor: "rgba(217, 70, 239, 0.2)"
        }
      },
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 15,
            weight: "700"
          },
          padding: 12
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false
        }
      }
    }
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2 className="card-title">📊 Sensor Data Visualization</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className={`btn btn-small ${chartType === "moisture" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setChartType("moisture")}
          >
            💧 Moisture
          </button>
          <button
            className={`btn btn-small ${chartType === "temperature" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setChartType("temperature")}
          >
            🌡️ Temperature
          </button>
          <button
            className={`btn btn-small ${chartType === "water" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setChartType("water")}
          >
            💦 Water Needed
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center", padding: "20px" }}>
          Loading chart data...
        </p>
      ) : sensorData.length > 0 ? (
        <div style={{ 
          position: "relative", 
          height: "400px", 
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "rgba(15, 30, 55, 0.4)",
          borderRadius: "12px",
          border: "1px solid rgba(46, 204, 113, 0.1)"
        }}>
          {chartType === "moisture" && (
            <Line data={moistureData} options={chartOptions} />
          )}
          {chartType === "temperature" && (
            <Line data={temperatureData} options={chartOptions} />
          )}
          {chartType === "water" && (
            <Bar data={waterData} options={chartOptions} />
          )}
        </div>
      ) : (
        <p style={{ color: "rgba(255, 255, 255, 0.6)", textAlign: "center", padding: "20px" }}>
          No sensor data available yet
        </p>
      )}

      {/* Summary Statistics */}
      {sensorData.length > 0 && (
        <div style={{ borderTop: "2px solid rgba(46, 204, 113, 0.2)", paddingTop: "20px" }}>
          <h3 style={{ 
            marginBottom: "15px", 
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.95)",
            fontWeight: "600"
          }}>
            📈 Statistics
          </h3>
          <div className="grid-4">
            <div className="stat-card">
              <div className="stat-label">Min Moisture</div>
              <div className="stat-value" style={{ fontSize: "24px", color: "#fbbf24" }}>
                {Math.min(...sensorData.map((d) => d.soilMoisture)).toFixed(2)}%
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Max Moisture</div>
              <div className="stat-value" style={{ fontSize: "24px", color: "#fbbf24" }}>
                {Math.max(...sensorData.map((d) => d.soilMoisture)).toFixed(2)}%
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Avg Temperature</div>
              <div className="stat-value" style={{ fontSize: "24px", color: "#fbbf24" }}>
                {(sensorData.reduce((sum, d) => sum + d.temperature, 0) / sensorData.length).toFixed(2)}°C
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Water Needed</div>
              <div className="stat-value" style={{ fontSize: "24px", color: "#fbbf24" }}>
                {(sensorData.reduce((sum, d) => sum + d.waterNeeded, 0)).toFixed(2)}L
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoistureChart