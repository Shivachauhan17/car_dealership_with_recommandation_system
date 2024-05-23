import React,{memo} from 'react'
import { SiPagespeedinsights } from "react-icons/si";
import { LiaRupeeSignSolid } from "react-icons/lia";
import AddToInventoryBtn from './AddToInventoryBtn';

function CarCard({item}) {
    const userType = localStorage.getItem('userType');
  return (
    <li className='transition duration-500 ease-in-out border-[1px] border-slate-200 my-4 p-10 hover:shadow-md rounded-lg hover:bg-orange-300'>
                    <h4 className='font-bold text-xl'>{item.name}</h4>
                    <div className='font-semibold text-md flex justify-between justify-items-center'>
                        <div className='flex justify-center justify-items-center'>
                            <LiaRupeeSignSolid className='text-xl'/>
                            <h3>{item.car_info.price}</h3>
                        </div>
                        <h4 className='p-1 px-2 text-black border-[1px] border-black font-normal rounded-lg'>{item.type}</h4>
                    </div>
                    <p className='text-md font-semibold'>Year:{item.model}</p>
                    <div className='text-md font-semibold flex justify-start justify-items-center gap-1'>
                        <SiPagespeedinsights className='text-xl'/>
                        <p>{item.car_info.milage}</p>
                    </div>
                    <p className='font-semibold text-slate-500'>{item.car_info.description}</p>
                    {userType==="dealership"
                    ?<div>
                        <AddToInventoryBtn item={item}/>
                    </div>
                    :null}
                </li>
  )
}

export default memo(CarCard)