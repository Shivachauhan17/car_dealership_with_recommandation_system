import React,{memo,useCallback,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CreateDeal from '../home/CreateDeal'
import CarCard from '../home/CarCard'


function CarCardsList() {
   const dispatch=useDispatch()
   
  const showPopUp=useSelector(state=>state.home.showDealPopUp)
  const isFiltered=useSelector(state=>state.inventory.isFiltered)
   const cars=useSelector(state=>state.inventory.allCars)
   const filteredCars=useSelector(state=>state.inventory.filteredCars)

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
        {
         showPopUp
         ?<CreateDeal/>
         :null
        }
        </div>
  )
}

export default memo(CarCardsList)