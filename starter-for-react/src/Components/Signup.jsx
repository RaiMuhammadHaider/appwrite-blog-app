import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Logo, Input, Button } from "./index"
import { useForm } from "react-hook-form"
import AuthService from "../lib/Auth"
import { login as loginAction } from "../store/authSlice"
import { useDispatch } from "react-redux"

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const signup = async (data) => {
    setError("")
    setLoading(true)
    try {
      const response = await AuthService.createAccount(data)
      if (response) {
        const user = await AuthService.currentUser()
        if (user) {
          dispatch(loginAction(user))
          navigate("/")
        }
      }
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <Logo />
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <Link to="/login" className="text-sm text-blue-500">
            Already have an account? Log in
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(signup)} className="space-y-4">
          {/* Name */}
          <div>
            <Input
              label="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  return emailPattern.test(value) || "Invalid email address"
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Global Error */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
