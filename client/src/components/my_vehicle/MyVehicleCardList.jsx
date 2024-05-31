import React,{memo} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import MyVehicleCard from './MyVehicleCard'

function MyVehicleCardList() {
    const dispatch=useDispatch()
   
    const allMine=useSelector(state=>state.mine.allMine)
    const isFiltered=useSelector(state=>state.mine.isFiltered)
    const filteredMine=useSelector(state=>state.mine.filteredMine)
  
    return (
     <div>
      <ul  className='flex flex-col justify-start lg:flex lg:flex-row lg:flex-wrap lg:justify-around'>
              {isFiltered
                 ?filteredMine.map((item,index)=>(
                    <MyVehicleCard item={item.car_id} id={item.id}/>
                 ))
                 :allMine.map((item,index)=>(
                    <MyVehicleCard item={item.car_id} id={item.id}/>
                 )) 
  
              }
          </ul>
          
          </div>
    )
}

export default memo(MyVehicleCardList)