import React,{useEffect} from 'react'
import LoginSignupNav from '../components/loginSignupPage/LoginSignupNav'
import Content from '../components/loginSignupPage/Content'
import { useNavigate } from 'react-router-dom'

function LoginSignup() {
  const navigate=useNavigate()
  const token=localStorage.getItem('token')

  useEffect(()=>{
    if(token!==undefined && token){
      navigate('/home')
    }
  },[])

  
  return (
    <div className="bg-[url('/images/phone-bg.jpg')]  h-screen bg-cover flex flex-col justify-start gap-24 lg:bg-[url('/images/laptop-bg.jpg')]">
        <LoginSignupNav/>
        <Content/>
    </div>
  )
}

export default LoginSignup