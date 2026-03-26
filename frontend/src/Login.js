import React, { useState } from "react"
import { authAPI } from "./api"
import { validators, validateForm, hasErrors } from "./validators"
import "./styles.css"

function Login({ setUserRole, setUser, setToken }) {
  const [mode, setMode] = useState("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const [loginErrors, setLoginErrors] = useState({})

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
    farmName: "",
    location: ""
  })

  const [registerErrors, setRegisterErrors] = useState({})

  const validateLoginForm = () => {
    const rules = {
      email: validators.email,
      password: (value) => validators.required(value, "Password")
    }
    const errors = validateForm(loginForm, rules)
    setLoginErrors(errors)
    return !hasErrors(errors)
  }

  const validateRegisterForm = () => {
    const rules = {
      username: validators.username,
      email: validators.email,
      password: validators.password,
      farmName: (value) => validators.required(value, "Farm Name"),
      location: (value) => validators.required(value, "Location")
    }

    const errors = validateForm(registerForm, rules)

    // Additional validation
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setRegisterErrors(errors)
    return !hasErrors(errors)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateLoginForm()) return

    setLoading(true)
    try {
      const response = await authAPI.login(loginForm)
      localStorage.setItem("token", response.data.token)
      setToken(response.data.token)
      setUserRole(response.data.user.role)
      setUser(response.data.user)
      setSuccess("Login successful!")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateRegisterForm()) return

    setLoading(true)
    try {
      const data = {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        role: registerForm.role,
        farmName: registerForm.farmName,
        location: registerForm.location
      }
      
      const response = await authAPI.register(data)
      localStorage.setItem("token", response.data.token)
      setToken(response.data.token)
      setUserRole(response.data.user.role)
      setUser(response.data.user)
      setSuccess("Registration successful!")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">💧 Smart Water System</h2>
        <p className="login-subtitle">Intelligent Agricultural Water Management</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="login-switch">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-input ${loginErrors.email ? "input-error" : ""}`}
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, email: e.target.value })
                  if (loginErrors.email) {
                    setLoginErrors({ ...loginErrors, email: "" })
                  }
                }}
              />
              {loginErrors.email && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {loginErrors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-input ${loginErrors.password ? "input-error" : ""}`}
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, password: e.target.value })
                  if (loginErrors.password) {
                    setLoginErrors({ ...loginErrors, password: "" })
                  }
                }}
              />
              {loginErrors.password && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {loginErrors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-input ${registerErrors.username ? "input-error" : ""}`}
                placeholder="Choose a username"
                value={registerForm.username}
                onChange={(e) => {
                  setRegisterForm({ ...registerForm, username: e.target.value })
                  if (registerErrors.username) {
                    setRegisterErrors({ ...registerErrors, username: "" })
                  }
                }}
              />
              {registerErrors.username && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {registerErrors.username}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-input ${registerErrors.email ? "input-error" : ""}`}
                placeholder="Enter your email"
                value={registerForm.email}
                onChange={(e) => {
                  setRegisterForm({ ...registerForm, email: e.target.value })
                  if (registerErrors.email) {
                    setRegisterErrors({ ...registerErrors, email: "" })
                  }
                }}
              />
              {registerErrors.email && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {registerErrors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={registerForm.role}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, role: e.target.value })
                }
              >
                <option value="farmer">Farmer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Farm Name</label>
              <input
                type="text"
                className={`form-input ${registerErrors.farmName ? "input-error" : ""}`}
                placeholder="Your farm name"
                value={registerForm.farmName}
                onChange={(e) => {
                  setRegisterForm({ ...registerForm, farmName: e.target.value })
                  if (registerErrors.farmName) {
                    setRegisterErrors({ ...registerErrors, farmName: "" })
                  }
                }}
              />
              {registerErrors.farmName && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {registerErrors.farmName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                className={`form-input ${registerErrors.location ? "input-error" : ""}`}
                placeholder="Your location"
                value={registerForm.location}
                onChange={(e) => {
                  setRegisterForm({ ...registerForm, location: e.target.value })
                  if (registerErrors.location) {
                    setRegisterErrors({ ...registerErrors, location: "" })
                  }
                }}
              />
              {registerErrors.location && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {registerErrors.location}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-input ${registerErrors.password ? "input-error" : ""}`}
                placeholder="Create a password"
                value={registerForm.password}
                onChange={(e) => {
                  setRegisterForm({ ...registerForm, password: e.target.value })
                  if (registerErrors.password) {
                    setRegisterErrors({ ...registerErrors, password: "" })
                  }
                }}
              />
              {registerErrors.password && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {registerErrors.password}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-input ${registerErrors.confirmPassword ? "input-error" : ""}`}
                placeholder="Confirm password"
                value={registerForm.confirmPassword}
                onChange={(e) => {
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value
                  })
                  if (registerErrors.confirmPassword) {
                    setRegisterErrors({ ...registerErrors, confirmPassword: "" })
                  }
                }}
              />
              {registerErrors.confirmPassword && (
                <div style={{ color: "#ff6b6b", fontSize: "12px", marginTop: "5px" }}>
                  {registerErrors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login