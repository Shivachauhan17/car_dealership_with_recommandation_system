import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

function CommonNav() {
  const navigate=useNavigate()
    const userType = localStorage.getItem('userType');

    return (
        <div className='flex justify-around items-center gap-[10px] text-slate-700'>
            <div 
            onClick={()=>{navigate('/home')}}
            className='hover:cursor-pointer font-semibold w-32 p-3 hover:text-white hover:bg-orange-400 transition-colors duration-2000 ease-in-out flex justify-center items-center tracking-wider text-xl'>
                <p>All Cars</p>
            </div>
            {/* {userType === "user" && (
                <div className='font-semibold w-32 p-3 hover:text-white hover:bg-orange-400 transition-colors duration-2000 ease-in-out flex justify-center items-center tracking-wider text-xl'>
                    <p>Dealer-Ships</p>
                </div>
            )} */}
            {userType === "user" && (
                <div 
                className='font-semibold w-32 p-3 hover:text-white hover:bg-orange-400 transition-colors duration-2000 ease-in-out flex justify-center items-center tracking-wider text-xl'>
                    <p>My Vehicles</p>
                </div>
            )}
            {userType !== "user" && (
                <div 
                onClick={()=>{navigate('/inventory')}}
                className='hover:cursor-pointer font-semibold w-32 p-3 hover:text-white hover:bg-orange-400 transition-colors duration-2000 ease-in-out flex justify-center items-center tracking-wider text-xl'>
                    <p>Inventory</p>
                </div>
            )}
            {userType !== "user" && (
                <div className='font-semibold w-32 p-3 hover:text-white hover:bg-orange-400 transition-colors duration-2000 ease-in-out flex justify-center items-center tracking-wider text-xl'>
                    <p>Deals</p>
                </div>
            )}
            {userType !== "user" && (
                <div className='font-semibold w-32 p-3 hover:text-white hover:bg-orange-400 transition-colors duration-2000 ease-in-out flex justify-center items-center tracking-wider text-xl'>
                    <p>Sold</p>
                </div>
            )}
            <button className='text-white tracking-wider font-semibold text-xl bg-sky-400 hover:bg-sky-300 transition-colors duration-2000 ease-in-out rounded-md p-[10px]'>
                LOGOUT
            </button>
        </div>
    );
}

export default memo(CommonNav);
