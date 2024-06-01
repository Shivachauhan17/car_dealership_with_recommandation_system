import React from 'react'
import {gql,useQuery} from '@apollo/client'
import { useDispatch,useSelector } from 'react-redux'
import {setDeals} from '../../store/deals_on_car/dealsReducer'
import Swal from 'sweetalert2'

function CarsDeals({id,isCarDeal}) {
    const dispatch=useDispatch()
    const deals=useSelector(state=>state.carDeals.deals)

    const DEAL_ON_CAR=gql`
        query ViewAllDealsOnCertainCar($carID:String!){
            viewAllDealsOnCertainCar(carID:$carID){
                id
                deal_info{
                    discount
                    description
                }
            }
        }
    `

    const variables={
        carID:id
    }


    const {data,loading,error}=useQuery(DEAL_ON_CAR,{
        variables:variables,
        onError:(error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: "Error in fetching the data of Cars Deals"
              })
        },
        onCompleted:(data)=>{
            dispatch(setDeals(data.viewAllDealsOnCertainCar))
        }
    })

  return (
    <div className={`w-[100vw] ${isCarDeal?'translate-x-0':'-translate-x-full'}`}>
        <ul className='m-6'>
            {
                deals.map((item,index)=>{
                    return <li className='hover:cursor-pointer transition duration-500 ease-in-out border-[1px] border-slate-200 my-4 p-10 hover:shadow-md rounded-lg hover:bg-orange-300 lg:w-[500px]'>
                        
                            <p className='font-semibold text-slate-500'><span className='text-black'>Discount:</span> {item.deal_info.discount}</p>
                            <p className='line-clamp-2 hover:line-clamp-none font-semibold text-slate-500'><span className='text-black'>Description:</span> {item.deal_info.description}</p>
                        
                    </li>
                })
            }
        </ul>
    </div>
  )
}

export default CarsDeals