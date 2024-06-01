import React from 'react'
import {gql,useQuery} from '@apollo/client'
import { useDispatch,useSelector } from 'react-redux'
import {setDealerShips} from '../../store/deals_on_car/dealsReducer'
import Swal from 'sweetalert2'
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";



function DealershipsDeals({id,isCarDeal}) {
    const dispatch=useDispatch()
    const dealerShips=useSelector(state=>state.carDeals.dealerShips)

    const DEALERSHIPS_FOR_CAR_DEAL=gql`
        query DealershipWithCertainCar($carID:String!){
            dealershipWithCertainCar(carID:$carID){
                id
                dealership_email
                dealership_name
                dealership_location
                dealership_info
            }
        }
    `

    const variables={
        carID:id
    }

    const {data,loading,error}=useQuery(DEALERSHIPS_FOR_CAR_DEAL,{
        variables:variables,
        onError:(error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: "Error in fetching the data of Cars Deals"
              })
        },
        onCompleted:(data)=>{
            dispatch(setDealerShips(data.dealershipWithCertainCar))
        }
    })

  return (
    <div className={` w-[100vw] ${isCarDeal?'translate-x-full':'translate-x-0'}`}>
        <ul className='m-6'>
            {
                dealerShips.map((item,index)=>{
                    return <li className='hover:cursor-pointer transition duration-500 ease-in-out border-[1px] border-slate-200 my-4 p-10 hover:shadow-md rounded-lg hover:bg-orange-300 lg:w-[500px]'>
                        <p className='font-bold text-xl'>{item.dealership_name}</p>
                        <div className='flex justify-start gap-[8px]'>
                            <MdEmail className='text-xl'/>
                            <p className='font-semibold text-slate-500'>{item.dealership_email}</p>
                        </div>
                        <div className='flex justify-start gap-[8px]'>
                            <FaLocationDot className='text-xl'/>
                            <p className='font-semibold text-slate-500'>{item.dealership_location}</p>
                        </div>
                        <p className='line-clamp-2 hover:line-clamp-none font-semibold text-slate-500'> <span className='text-black'>Dealership Info</span>{item.dealership_info}</p>
                    </li>
                })
            }
        </ul>
    </div>
  )
}

export default DealershipsDeals