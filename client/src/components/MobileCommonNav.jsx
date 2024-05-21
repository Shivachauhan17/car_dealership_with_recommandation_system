import React,{memo} from 'react'
import { useNavigate } from 'react-router-dom'


function MobileCommonNav() {
    const userType = localStorage.getItem('userType');
  return (
    
        <div className='flex flex-col justify-around items-center gap-2 bg-slate-100 w-[200px] '>
            <div className='transition duration-500 ease-in-out font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'>All Cars</p></div>
            {userType==="user"?<div className='transition duration-500 font-semibold w-full hover:text-white hover:bg-orange-400 flex justify-center items-center' ><p className='h-fit p-[9px] '>Dealer-Ships</p></div>:null}
            {userType==="user"?<div className='transition duration-500 font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px] '>My Vhicles</p></div>:null}
            {userType!=="user"?<div className='transition duration-500 font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px] '>Inventory</p></div>:null}
            {userType!=="user"?<div className='transition duration-500 font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px] '>Deals</p></div>:null}
            {userType!=="user"?<div className='transition duration-500 font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center' ><p className=' h-fit p-[9px] '>Sold</p></div>:null}
            <div className='transition duration-500 font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className=' h-fit p-[9px]'>LOGOUT</p></div>
        </div>

   
  )
}

export default memo(MobileCommonNav)