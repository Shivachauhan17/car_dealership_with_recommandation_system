import React,{memo} from 'react'
import { SiPagespeedinsights } from "react-icons/si";
import { LiaRupeeSignSolid } from "react-icons/lia";
import AddToInventoryBtn from './AddToInventoryBtn';
import CreateDealBtn from './CreateDealBtn';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Rating from './Rating';

function CarCard({item}) {
    const onHome=useSelector(state=>state.home.onHome)
    const userType = localStorage.getItem('userType');
  return (
    <li className='transition duration-500 ease-in-out border-[1px] border-slate-200 my-4 p-10 hover:shadow-md rounded-lg hover:bg-orange-300 lg:w-[500px]'>
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
                    ?<div className='flex justify-between justify-items-center'>
                        {onHome?<AddToInventoryBtn id={item.id}/>:null}
                        <CreateDealBtn item={item}/>
                    </div>
                    :null}
                    {userType==="user"
                    ?<div>
                        <div className='mt-4'><Link className='rounded-md bg-sky-400 hover:bg-sky-300 p-[5px] px-[10px] mt-2 font-semibold text-white' to={`/deal_on_car/${item.id}`} >Deals On Car</Link></div>
                    </div>
                    :null
                    }
                    {userType==="user"
                    ?<Rating carID={item.id}/>
                    :null
                    }
                </li>
  )
}

export default memo(CarCard)