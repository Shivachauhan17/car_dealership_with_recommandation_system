import React,{memo} from 'react'
import { SiPagespeedinsights } from "react-icons/si";
import { LiaRupeeSignSolid } from "react-icons/lia";



function SoldCarCard({item,vehicle_info,id}) {
    

  
  return (
    <li className='transition duration-500 ease-in-out border-[1px] border-slate-200 my-4 p-10 hover:shadow-md rounded-lg hover:bg-orange-300 lg:w-[500px]'>
                    <h4 className='font-bold text-xl'>{item.name}</h4>
                    <div className='font-semibold text-md flex justify-between justify-items-center'>
                        <div className='flex justify-center justify-items-center'>
                            
                            <LiaRupeeSignSolid className='text-xl'/>
                            <h3>{item.car_info.price}</h3>
                        </div>
                        <div >
                            <h3><span className='font-bold'>Sold Price:</span> {vehicle_info.sold_price}</h3>
                        </div>
                        <h4 className='p-1 px-2 text-black border-[1px] border-black font-normal rounded-lg'>{item.type}</h4>
                    </div>
                    <p className='text-md font-semibold'>Sold Date:{vehicle_info.sold_date}</p>
                    <p className='text-md font-semibold'>Model Year:{item.model}</p>
                    <div className='text-md font-semibold flex justify-start justify-items-center gap-1'>
                        <SiPagespeedinsights className='text-xl'/>
                        <p>{item.car_info.milage}</p>
                    </div>
                    <div className='font-semibold text-slate-500'><span className='font-bold '>Deal Closing Description: </span ><p className='line-clamp-4 hover:line-clamp-none'>{vehicle_info.description}</p></div>
        
                    
                </li>
  )
}

export default memo(SoldCarCard)