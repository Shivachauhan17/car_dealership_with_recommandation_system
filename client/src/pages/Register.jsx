import React,{useEffect} from 'react'
import LoginSignupNav from '../components/loginSignupPage/LoginSignupNav'
import RegisterForm from '../components/register/Register'
import { useNavigate } from 'react-router-dom'


function Register() {
  const navigate=useNavigate()
  const token=localStorage.getItem('token')
  useEffect(()=>{
    if(token!==undefined && token){
      navigate('/home')
    }
  },[])
  return (
    <div className=" bg-[url('/images/phone-bg.jpg')] bg-cover bg-fit h-screen lg:bg-[url('/images/laptop-bg.jpg')]">
        <LoginSignupNav/>
        <RegisterForm/>
    </div>
  )
}

export default Register