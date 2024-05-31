import React,{memo} from 'react'
import { useSelector } from 'react-redux'
import SoldCarCard from './SoldCarCard'

function SoldCarCardList() {
    const allSold=useSelector(state=>state.sold.allSold)
    const filteredSold=useSelector(state=>state.sold.filteredSold)
    const isFiltered=useSelector(state=>state.sold.isFiltered)

  return (
    <div>
      <ul  className='flex flex-col justify-start lg:flex lg:flex-row lg:flex-wrap lg:justify-around'>
              {isFiltered
                 ?filteredSold.map((item,index)=>(
                    <SoldCarCard item={item.car_id} vehicle_info={item.vehicle_info} id={item.id}/>
                 ))
                 :allSold.map((item,index)=>(
                    <SoldCarCard item={item.car_id} vehicle_info={item.vehicle_info} id={item.id}/>
                 )) 
  
              }
          </ul>
          
          </div>
  )
}

export default SoldCarCardList