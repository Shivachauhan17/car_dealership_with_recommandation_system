import React from 'react'
import LoginSignupNav from '../components/loginSignupPage/LoginSignupNav'
import Content from '../components/loginSignupPage/Content'

function LoginSignup() {
  return (
    <div className="bg-[url('/images/phone-bg.jpg')]  h-screen bg-cover flex flex-col justify-start gap-24 lg:bg-[url('/images/laptop-bg.jpg')]">
        <LoginSignupNav/>
        <Content/>
    </div>
  )
}

export default LoginSignup