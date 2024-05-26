import React,{memo} from 'react'
import { useSelector } from 'react-redux'
import CreateDeal from './CreateDeal'
import CarCard from './CarCard'

function CarCardsList() {
  const filteredCars=useSelector(state=>state.home.filteredCars)
  const showPopUp=useSelector(state=>state.home.showDealPopUp)

  return (
   <div>
    <ul  className='flex flex-col justify-start'>
            {
               filteredCars.map((item,index)=>(
                  <CarCard item={item} />
               )) 

            }
        </ul>
        {
         showPopUp
         ?<CreateDeal/>
         :null
        }
        </div>
  )
}

export default memo(CarCardsList)