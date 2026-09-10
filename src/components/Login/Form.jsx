import React from 'react'
import './form.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = () => {

  const [isLogin, setIsLogin] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()


  const handleClick = (e) => {
    e.preventDefault()

    setMessage("")
    setIsError(false)

    if (!email || !password || (!isLogin && !name) || (!isLogin && !confirmPassword)) {
      setMessage("Please fill in all fields");
      setIsError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setIsError(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || []


    if (!isLogin) {
      if (password !== confirmPassword) {
        setIsError(true);
        setMessage("Passwords do not match");
        return;
      }

      const useExists = users.find(user => user.email === email)
      if (useExists) {
        setIsError(true);
        setMessage("Email is already registered. Please login.");
        return;
      }

      const newUser = { name, email, password }
      localStorage.setItem("users", JSON.stringify([...users, newUser]))

      setMessage("Registration successful! You can now login.")
      setIsError(false)
      setIsLogin(true)

    } else {
      const validUser = users.find(user => user.email === email && user.password === password)
      if (!validUser) {
        setIsError(true)
        setMessage("Invalid email or password")
        return;
      }

      setMessage(`Login successful! Welcome back, ${validUser.name}.`)
      setIsError(false)

      localStorage.setItem("currentUser", JSON.stringify(validUser))

      setLoading(true);

      setTimeout(() => {
        navigate("/main/Main")
        setLoading(false);
      }, 2000)
    }

    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")

  }

  return (
    <div className='login-main-container'>
      <div className='auth-card'>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleClick}>
          {!isLogin && (
            <div className="input-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Name</label>
            </div>
          )}
          <div className="input-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
            </span>
          </div>

          {!isLogin && (
            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label>Confirm Password</label>
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
              </span>
            </div>
          )}

          <button
            type="submit" className="primary-btn">
            {isLogin ? "Login" : "Register"}
          </button>

          {message && (
            <p className={isError ? "error-message" : "success-message"}>{message}</p>
          )}

          <button
            type='button'
            className='toggle-btn'
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setIsError(false)
            }}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </form>
      </div >

      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}

    </div >
  )
}

export default Form