import axios from "axios"

const API_BASE_URL = "http://localhost:5000"

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
  getCredits: () => api.get("/auth/credits")
}

// Sensor APIs
export const sensorAPI = {
  addSensorData: (data) => api.post("/sensor/add", data),
  getAllSensors: () => api.get("/sensor/all"),
  getUserSensors: () => api.get("/sensor/user-data"),
  getSensorByFarm: (farmId) => api.get(`/sensor/farm/${farmId}`),
  getLatestReadings: () => api.get("/sensor/latest/readings")
}

// Trade APIs
export const tradeAPI = {
  createTrade: (data) => api.post("/trade/create", data),
  getAllTrades: () => api.get("/trade/all"),
  getUserTrades: () => api.get("/trade/user-trades"),
  buyTrade: (tradeId) => api.post(`/trade/buy/${tradeId}`),
  cancelTrade: (tradeId) => api.post(`/trade/cancel/${tradeId}`),
  getTradeHistory: () => api.get("/trade/history")
}

// Farm APIs
export const farmAPI = {
  createFarm: (data) => api.post("/farm", data),
  getUserFarms: () => api.get("/farm/user-farms"),
  getFarmById: (farmId) => api.get(`/farm/${farmId}`),
  updateFarm: (farmId, data) => api.put(`/farm/${farmId}`, data),
  deleteFarm: (farmId) => api.delete(`/farm/${farmId}`),
  getAllFarms: () => api.get("/farm/admin/all-farms")
}

// Water Market APIs
export const waterAPI = {
  getBalance: () => api.get("/water/balance"),
  buyWater: (amount) => api.post("/water/buy", { amount }),
  deductWater: (waterAmount) => api.post("/water/deduct", { waterAmount }),
  recordIrrigation: (data) => api.post("/water/record-irrigation", data),
  getTransactionHistory: () => api.get("/water/history"),
  addCredits: (userId, amount, reason) => api.post("/water/add-credits", { userId, amount, reason })
}

export default api
