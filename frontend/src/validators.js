// Form validation utilities

export const validators = {
  // Email validation
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return "Email is required"
    if (!regex.test(value)) return "Please enter a valid email address"
    return ""
  },

  // Password validation
  password: (value) => {
    if (!value) return "Password is required"
    if (value.length < 6) return "Password must be at least 6 characters"
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter"
    if (!/[0-9]/.test(value)) return "Password must contain at least one number"
    return ""
  },

  // Username validation
  username: (value) => {
    if (!value) return "Username is required"
    if (value.length < 3) return "Username must be at least 3 characters"
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscores"
    return ""
  },

  // Number validation (for water amounts, etc)
  positiveNumber: (value, label = "Value") => {
    if (!value) return `${label} is required`
    if (isNaN(value)) return `${label} must be a number`
    if (parseFloat(value) <= 0) return `${label} must be greater than 0`
    return ""
  },

  // Text field validation
  required: (value, label = "Field") => {
    if (!value || value.trim() === "") return `${label} is required`
    return ""
  },

  // Phone number validation (basic)
  phone: (value) => {
    if (!value) return "Phone number is required"
    const regex = /^[\d\s\-+()]+$/
    if (!regex.test(value) || value.replace(/\D/g, "").length < 10) {
      return "Please enter a valid phone number"
    }
    return ""
  }
}

// Validate entire form
export const validateForm = (formData, rules) => {
  const errors = {}

  Object.keys(rules).forEach(field => {
    const validator = rules[field]
    if (typeof validator === "function") {
      const error = validator(formData[field])
      if (error) errors[field] = error
    }
  })

  return errors
}

// Check if form has errors
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0
}
