import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

function MobileCommonNav({ showSidebar }) {
    const userType = localStorage.getItem('userType');
    const navigate=useNavigate()

    return (
        <div className={`fixed flex flex-col justify-around items-center gap-2 bg-slate-100 w-[200px] transition-transform duration-500 ease-in-out ${showSidebar ? 'translate-x-0' : 'translate-x-full'} top-[60px] right-0`}>
            <div 
            onClick={()=>{navigate('/home')}}
            className='hover:cursor-pointer font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'>Home</p></div>
            {/* {userType === "user" && <div className='font-semibold w-full hover:text-white hover:bg-orange-400 flex justify-center items-center'><p className='h-fit p-[9px]'>Dealer-Ships</p></div>} */}
            {userType === "user" && <div 
            onClick={()=>{navigate('/myVehicle')}}
            className='font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'>My Vehicles</p></div>}
            {userType !== "user" && <div 
                onClick={()=>{navigate('/inventory')}}
                className='hover:cursor-pointer font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'>Inventory</p></div>}
            {userType !== "user" && <div 
                                        onClick={()=>{navigate('/myDeals')}}
                                        className='font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'>Deals</p></div>}
            {userType !== "user" && <div 
            onClick={()=>{navigate('/sold')}}
            className='font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'>Sold</p></div>}
            <div className='font-semibold hover:bg-orange-400 hover:text-white w-full flex justify-center items-center'><p className='h-fit p-[9px]'
                onClick={()=>{localStorage.removeItem("token");
                navigate('/')
                }}
            >LOGOUT</p></div>
        </div>
    );
}

export default memo(MobileCommonNav);
