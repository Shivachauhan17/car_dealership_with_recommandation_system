import React,{memo} from 'react'
import { useSelector } from 'react-redux'

import CarCard from './CarCard'

function CarCardsList() {
  const filteredCars=useSelector(state=>state.home.filteredCars)

  return (
    <ul  className='flex flex-col justify-start'>
            {
               filteredCars.map((item,index)=>(
                  <CarCard item={item} />
               )) 

            }
        </ul>
  )
}

export default memo(CarCardsList)