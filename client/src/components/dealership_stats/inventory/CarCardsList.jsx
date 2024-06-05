import React,{memo} from 'react'
import { useSelector } from 'react-redux'
import CarCard from '../../home/CarCard'


function CarCardsList() {
   
  const isFiltered=useSelector(state=>state.inventoryByEmail.isFiltered)
   const cars=useSelector(state=>state.inventoryByEmail.allCars)
   const filteredCars=useSelector(state=>state.inventoryByEmail.filteredCars)

  return (
   <div>
    <ul  className='flex flex-col justify-start lg:flex lg:flex-row lg:flex-wrap lg:justify-around'>
            {isFiltered
               ?filteredCars.map((item,index)=>(
                  <CarCard key={index} item={item} />
               ))
               :cars.map((item,index)=>(
                  <CarCard key={index} item={item} />
               )) 

            }
        </ul>
        
        </div>
  )
}

export default memo(CarCardsList)