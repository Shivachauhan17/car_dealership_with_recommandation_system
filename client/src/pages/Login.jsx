import React from 'react'
import LoginSignupNav from '../components/loginSignupPage/LoginSignupNav'
import LoginForm from '../components/login/Login'
import { useNavigate } from 'react-router-dom'


function Login() {
  const navigate=useNavigate()
  const token=localStorage.getItem('token')
  console.log(token)
  useEffect(()=>{
    if(token!==undefined && token){
      navigate('/home')
    }
  },[])
  return (
    <div className=" bg-[url('/images/phone-bg.jpg')] bg-cover bg-fit h-screen lg:bg-[url('/images/laptop-bg.jpg')]">
        <LoginSignupNav/>
        <LoginForm/>
    </div>
  )
}

export default Login