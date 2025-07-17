import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

const loginFields = [
  { label: "Email", type: "email", placeholder: "Enter your email", name: "email" },
  { label: "Password", type: "password", placeholder: "Enter your password", name: "password" }
]

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const triggerError = (message) => {
    setError(message)
    setTimeout(() => setError(""), 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await api.post("/api/auth/login", formData)
      const data = response.data

      console.log(response, data)

      if (response.status === 200) {
        // Optional: Save token or user data to localStorage/sessionStorage here
        localStorage.setItem("token", response.data.token)

        navigate("/dashboard") // Redirect to a protected route
      } else {
        triggerError("Invalid credentials. Please try again.")
      }

    } catch (err) {
      triggerError(err.response?.data.error)
      // triggerError("Login failed. Please check your email and password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh]'>
      <h2 className='text-center text-4xl font-bold'>Login to Certify</h2>

      <form className='w-[90%] md:w-[40%] my-8' onSubmit={handleSubmit}>
        {loginFields.map(({ label, type, placeholder, name }) => (
          <div key={name}>
            <label htmlFor={name} className='block text-right w-fit mt-3 font-medium'>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              className='block border border-[#CFDBE8] rounded-lg w-full p-2 my-2 outline-0'
              required
            />
          </div>
        ))}

        {error && (
          <p className='text-red-600 text-sm text-center mt-2'>{error}</p>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full mt-5 bg-[#0A80ED] py-2 text-white rounded-2xl disabled:opacity-50'
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className='text-center'>
        Don't have an account?{" "}
        <Link to="/signup" className='text-[#0A80ED] font-medium'>Sign up</Link>
      </p>
    </div>
  )
}

export default Login
