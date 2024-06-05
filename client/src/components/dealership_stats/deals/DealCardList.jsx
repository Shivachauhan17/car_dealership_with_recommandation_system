import React,{memo} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import DealCard from '../../myDeals/DealCard'

function DealCardList() {
    const dispatch=useDispatch()
   
    const deals=useSelector(state=>state.dealsByEmail.allDeals)
    const isFiltered=useSelector(state=>state.dealsByEmail.isFiltered)
    const filteredDeals=useSelector(state=>state.dealsByEmail.filteredDeals)
  
    return (
     <div>
      <ul  className='flex flex-col justify-start lg:flex lg:flex-row lg:flex-wrap lg:justify-around'>
              {isFiltered
                 ?filteredDeals.map((item,index)=>(
                    <DealCard item={item.car_id} deal={item.deal_info} id={item.id}/>
                 ))
                 :deals.map((item,index)=>(
                    <DealCard item={item.car_id} deal={item.deal_info} id={item.id}/>
                 )) 
  
              }
          </ul>
          
          </div>
    )
}

export default memo(DealCardList)