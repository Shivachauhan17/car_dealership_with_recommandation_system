import React,{memo} from 'react'
import Icon from '../Logo'
import {useNavigate} from 'react-router-dom'

function LoginSignupNav() {
  const navigate=useNavigate()
  return (
    <div className='bg-slate-100 py-2  font-sans lg:h-[70px] ' >
    <div className='w-full my-auto flex justify-between px-2 justify-items-center'>
        <Icon/>
      <div className=' w-64 lg:w-96 flex px-[5px] justify-around text-white'>
        <div className='bg-sky-400 hover:bg-sky-300 px-[10px] flex justify-center justify-items-center rounded-md lg:w-36 lg:text-xl lg:tracking-wider'><button onClick={()=>{navigate('/login')}}>Login</button></div>
        <div className='bg-sky-400 hover:bg-sky-300 px-[10px] flex justify-center justify-items-center rounded-md lg:w-36 lg:text-xl lg:tracking-wider'><button onClick={()=>{navigate('/register')}}>Register</button></div>
      </div>
    </div>
    </div>
  )
}

export default memo(LoginSignupNav)