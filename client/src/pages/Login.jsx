import React from 'react'
import LoginSignupNav from '../components/loginSignupPage/LoginSignupNav'
import LoginForm from '../components/login/Login'

function Login() {
  return (
    <div className=" bg-[url('/images/phone-bg.jpg')] bg-cover bg-fit h-screen lg:bg-[url('/images/laptop-bg.jpg')]">
        <LoginSignupNav/>
        <LoginForm/>
    </div>
  )
}

export default Login