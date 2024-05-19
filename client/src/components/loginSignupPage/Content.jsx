import React,{memo} from 'react'
import {useNavigate} from 'react-router-dom'

function Content() {
  const navigate=useNavigate()

  return (
    <div className='text-white p-2 flex flex-col gap-8 h-2/3'>
        <h2 className='text-3xl text-orange-500 font-bold font-sans'>Find the Car You've Been Looking For!</h2>
        <ul>
            <li className='text-xl font-light'><span className='text-orange-300'>Smart Automatic Notifications</span> Of Suitable Deal!</li>
            <li className='text-xl font-light'>Sell Your Car in Less Than <span className='text-orange-300'>24</span> Hours!</li>
            <li className='text-xl font-light'>More Than <span className='text-orange-300'>5,000</span> Happy Sellers Every Month!</li>
            <li className='text-xl font-light'><span className='text-orange-300'>100% Secure</span> Transactions!</li>
        </ul>
        <button onClick={()=>{navigate('/register')}} className='w-36 bg-sky-400 hover:bg-sky-300 px-[10px] flex justify-center justify-items-center rounded-sm'>Get Started!</button>
    </div>
  )
}

export default memo(Content)