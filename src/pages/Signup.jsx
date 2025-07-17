import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

const formFields = [
  { label: "Full Name", type: "text", placeholder: "Enter your fullname", name: "name" },
  { label: "Email", type: "email", placeholder: "Enter your email", name: "email" },
  { label: "Password", type: "password", placeholder: "Enter your password", name: "password" },
  { label: "Confirm Password", type: "password", placeholder: "Confirm your password", name: "confirmPassword" }
]

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Auto-clear error after 3 seconds
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

    if (formData.password !== formData.confirmPassword) {
      triggerError("Passwords do not match.")
      return
    }

    try {
      setLoading(true)
      const { confirmPassword, ...payload } = formData
      const response = await api.post("/api/auth/signup", payload)

      if (response.status === 201) {
        navigate("/login")
      } else {
        triggerError("Signup failed. Please try again.")
      }
    } catch (err) {
      console.error(err)
      triggerError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh]'>
      <h2 className='text-center text-4xl font-bold'>Signup for Certify</h2>

      <form className='w-[90%] md:w-[40%] my-8' onSubmit={handleSubmit}>
        {formFields.map(({ label, type, placeholder, name }) => (
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
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>

      <p className='text-center'>
        Already have an Account?{" "}
        <Link to="/login" className='text-[#0A80ED] font-medium'>Login</Link>
      </p>
    </div>
  )
}

export default Signup
