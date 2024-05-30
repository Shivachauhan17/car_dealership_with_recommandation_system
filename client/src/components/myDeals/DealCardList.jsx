import React,{memo} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import DealCard from './DealCard'

function DealCardList() {
    const dispatch=useDispatch()
   
    const deals=useSelector(state=>state.deal.allDeals)
    const isFiltered=useSelector(state=>state.deal.isFiltered)
    const filteredDeals=useSelector(state=>state.deal.filteredDeals)
  
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