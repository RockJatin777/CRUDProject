import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './index.css'

const RegisterPage = () =>  {
  
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsgForUsername, setErrorMsgForUsername] = useState('')
  const [errorMsgForPassword, setErrorMsgForPassword] = useState('') 
  const [showSubmitError, setShowSubmitErr] = useState(false)
  const [submitErrorMsg, setSubmitErrorMsg] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsgForConfirmPassword, setErrorMsgForConfirmPassword] = useState('')
  
  const navigate = useNavigate()

  

  const checkNotEmptyConfirmPassword = event => {
    if(event.target.value === ""){
        setErrorMsgForConfirmPassword("*Confirm Password can't be empty")
    } else {
        setErrorMsgForConfirmPassword('')
    }
  }

  const checkNotEmptyUsername = event => {
    if(event.target.value === ""){
        setErrorMsgForUsername("*Username can't be empty")
    } else {
        setErrorMsgForUsername('')
    }
  }

  const checkNotEmptyPassword = event => {
    if(event.target.value === ""){
        setErrorMsgForPassword("*Password can't be empty")
    } else {
        setErrorMsgForPassword('')
    }
  }

  const onChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  const onChangeUsername = event => {
    setUserName(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  

  const submitForm = async event => {
    event.preventDefault()
    if(password === confirmPassword){
      if(username !== "" && password.length > 7){
  
        localStorage.setItem("user", [username, password])
        navigate('/');
      } else {
        setShowSubmitErr(true)
        setSubmitErrorMsg('Please Provide Valid Username or Password')
        
      }
    } else {
      setShowSubmitErr(true)
      setSubmitErrorMsg('Password is not Matching....')
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
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" className="register-img" alt="website login" />
        <form className="form-container" onSubmit={submitForm}>
          <h1 className='register-page-heading'>Sign Up</h1>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <div className='input-container'>
            <label className="input-label" htmlFor="confirmPassword">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="password-input-field"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
              onBlur={checkNotEmptyConfirmPassword}
              placeholder="Confirm Password"
            />
            <p className='error-message'>{errorMsgForConfirmPassword}</p>
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
          {showSubmitError && <p className='error-message'>{submitErrorMsg}</p>}
        </form>
      </div>
    )
  }


export default RegisterPage