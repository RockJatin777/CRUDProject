import {Link} from 'react-router-dom'


import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './index.css'

const LoginPage = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsgForUsername, setErrorMsgForUsername] = useState('')
  const [errorMsgForPassword, setErrorMsgForPassword] = useState('') 
  const [showSubmitError, setShowSubmitErr] = useState(false)
  const [submitErrorMsg, setSubmitErrorMsg] = useState('')
  const navigate = useNavigate()

  const checkNotEmptyUsername = event => {
    if(event.target.value === ""){
        setErrorMsgForUsername("*required")
    } else {
        setErrorMsgForUsername('')
    }
  }

  const checkNotEmptyPassword = event => {
    if(event.target.value === ""){
        setErrorMsgForPassword("*required")
    } else {
        setErrorMsgForPassword('')
    }
  }

  const onChangeUsername = event => {
    setUserName(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  

  const submitForm = async event => {
    event.preventDefault()
    let userDetails = localStorage.getItem('user')
    userDetails = userDetails.split(",")
    if(username === userDetails[0] && password === userDetails[1]){
      navigate('/');
    } else {
      setShowSubmitErr(true)
      setSubmitErrorMsg('Please Provide Valid Username or Password')
      
    }
  }

  const renderPasswordField = () => (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          onBlur={checkNotEmptyPassword}
          placeholder="Password"
        />
        <p className='error-message'>{errorMsgForPassword}</p>
      </>
    )

  const renderUsernameField = () => (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          onBlur={checkNotEmptyUsername}
          placeholder="Username"
        />
        <p className='error-message'>{errorMsgForUsername}</p>
      </>
    )

    
    return (
        <div className="login-form-container">
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" className="login-img" alt="website login" />
        <form className="form-container" onSubmit={submitForm}>
          <h1 className='login-page-heading'>Login</h1>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className='error-message'>{submitErrorMsg}</p>}
          <p>If you don't have account</p>
          <Link to="/register">
            <p>Sign Up</p>
          </Link>
        </form>
      </div>
    )
  }

export default LoginPage