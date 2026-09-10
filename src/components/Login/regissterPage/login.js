import React, { useState } from 'react'
import './form.css'

const Form = () => {

  const [isLogin, setIsLogin] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setMessage("")
    setIsError(false)

    if (!email || !password || (!isLogin && (!name || !confirmPassword))) {
      setIsError(true)
      setMessage("Please fill all fields")
      return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    if (isLogin) {
      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      )

      if (existingUser) {
        setMessage(`Welcome back, ${existingUser.name}!`)
        localStorage.setItem("currentUser", JSON.stringify(existingUser))
      } else {
        setIsError(true)
        setMessage("Invalid email or password")
      }

    } else {

      if (password !== confirmPassword) {
        setIsError(true)
        setMessage("Passwords do not match")
        return
      }

      const userExists = users.find((user) => user.email === email)

      if (userExists) {
        setIsError(true)
        setMessage("User already exists")
        return
      }

      const newUser = { name, email, password }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      setMessage("Registration successful! Please login.")
      setIsLogin(true)

      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <div className='login-main-container'>
      <div className='auth-card'>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <div className='input-group'>
              <input
                type="text"
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className='input-group'>
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='input-group'>
            <input
              type="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className='input-group'>
              <input
                type="password"
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="primary-btn">
            {isLogin ? "Login" : "Register"}
          </button>

          {message && (
            <p style={{ color: isError ? "red" : "green" }}>
              {message}
            </p>
          )}

          <button
            type="button"
            className='toggle-btn'
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage("")
              setIsError(false)
            }}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Form
