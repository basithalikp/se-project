import React, { useState, useEffect } from "react"
import { authAPI, farmAPI } from "./api"
import "./styles.css"

function Profile({ user }) {
  const [profile, setProfile] = useState(user)
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showAddFarm, setShowAddFarm] = useState(false)
  
  const [formData, setFormData] = useState({
    farmName: profile?.farmName || "",
    location: profile?.location || "",
    phoneNumber: profile?.phoneNumber || ""
  })

  const [farmForm, setFarmForm] = useState({
    farmName: "",
    latitude: "",
    longitude: "",
    area: "",
    cropType: "rice",
    soilType: "loamy",
    waterSource: "well"
  })

  useEffect(() => {
    loadFarms()
  }, [])

  const loadFarms = async () => {
    try {
      const response = await farmAPI.getUserFarms()
      setFarms(response.data)
    } catch (err) {
      setError("Failed to load farms")
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await authAPI.updateProfile(formData)
      setProfile(response.data.user)
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleAddFarm = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await farmAPI.createFarm({
        ...farmForm,
        latitude: parseFloat(farmForm.latitude),
        longitude: parseFloat(farmForm.longitude),
        area: parseFloat(farmForm.area)
      })
      setSuccess("Farm added successfully!")
      setFarmForm({
        farmName: "",
        latitude: "",
        longitude: "",
        area: "",
        cropType: "rice",
        soilType: "loamy",
        waterSource: "well"
      })
      setShowAddFarm(false)
      loadFarms()
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add farm")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFarm = async (farmId) => {
    if (window.confirm("Are you sure you want to delete this farm?")) {
      try {
        await farmAPI.deleteFarm(farmId)
        setSuccess("Farm deleted successfully!")
        loadFarms()
      } catch (err) {
        setError("Failed to delete farm")
      }
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">👤 Profile & Settings</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Profile Form */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Personal Information</h3>
        <form onSubmit={handleUpdateProfile}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={profile?.username || ""}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={profile?.email || ""}
                disabled
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Farm Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.farmName}
                onChange={(e) =>
                  setFormData({ ...formData, farmName: e.target.value })
                }
                placeholder="Your farm name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Your location"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Water Credits</label>
            <input
              type="number"
              className="form-input"
              value={profile?.waterCredits || 0}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Farms Section */}
      <div style={{ borderTop: "2px solid #eee", paddingTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ fontSize: "18px" }}>🚜 My Farms</h3>
          <button
            className="btn btn-primary btn-small"
            onClick={() => setShowAddFarm(!showAddFarm)}
          >
            {showAddFarm ? "Cancel" : "+ Add Farm"}
          </button>
        </div>

        {/* Add Farm Form */}
        {showAddFarm && (
          <form onSubmit={handleAddFarm} style={{ background: "#f8f9fa", padding: "20px", borderRadius: "5px", marginBottom: "20px" }}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Farm Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={farmForm.farmName}
                  onChange={(e) =>
                    setFarmForm({ ...farmForm, farmName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Area (hectares)</label>
                <input
                  type="number"
                  className="form-input"
                  step="0.1"
                  value={farmForm.area}
                  onChange={(e) =>
                    setFarmForm({ ...farmForm, area: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Latitude</label>
                <input
                  type="number"
                  className="form-input"
                  step="0.0001"
                  value={farmForm.latitude}
                  onChange={(e) =>
                    setFarmForm({ ...farmForm, latitude: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Longitude</label>
                <input
                  type="number"
                  className="form-input"
                  step="0.0001"
                  value={farmForm.longitude}
                  onChange={(e) =>
                    setFarmForm({ ...farmForm, longitude: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Crop Type</label>
                <select
                  className="form-select"
                  value={farmForm.cropType}
                  onChange={(e) =>
                    setFarmForm({ ...farmForm, cropType: e.target.value })
                  }
                >
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="sugarcane">Sugarcane</option>
                  <option value="cotton">Cotton</option>
                  <option value="vegetables">Vegetables</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Soil Type</label>
                <select
                  className="form-select"
                  value={farmForm.soilType}
                  onChange={(e) =>
                    setFarmForm({ ...farmForm, soilType: e.target.value })
                  }
                >
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silty">Silty</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Water Source</label>
              <select
                className="form-select"
                value={farmForm.waterSource}
                onChange={(e) =>
                  setFarmForm({ ...farmForm, waterSource: e.target.value })
                }
              >
                <option value="well">Well</option>
                <option value="borewell">Borewell</option>
                <option value="canal">Canal</option>
                <option value="pond">Pond</option>
                <option value="underground">Underground</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Adding..." : "Add Farm"}
            </button>
          </form>
        )}

        {/* Farms List */}
        {farms.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Farm Name</th>
                <th>Crop Type</th>
                <th>Area (ha)</th>
                <th>Soil Type</th>
                <th>Water Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {farms.map((farm) => (
                <tr key={farm._id}>
                  <td>{farm.farmName}</td>
                  <td>{farm.cropType}</td>
                  <td>{farm.area}</td>
                  <td>{farm.soilType}</td>
                  <td>{farm.waterSource}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDeleteFarm(farm._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#666" }}>
            No farms added yet.{" "}
            {!showAddFarm && (
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#2ecc71",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
                onClick={() => setShowAddFarm(true)}
              >
                Add your first farm
              </button>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Profile
