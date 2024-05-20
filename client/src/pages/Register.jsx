import React from 'react'
import LoginSignupNav from '../components/loginSignupPage/LoginSignupNav'
import RegisterForm from '../components/register/Register'

function Register() {
  return (
    <div className=" bg-[url('/images/phone-bg.jpg')] bg-cover bg-fit h-screen lg:bg-[url('/images/laptop-bg.jpg')]">
        <LoginSignupNav/>
        <RegisterForm/>
    </div>
  )
}

export default Register