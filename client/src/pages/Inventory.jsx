import React,{useEffect} from 'react'
import Nav from '../components/Nav'
import Info from '../components/inventory/Info'
import CarCardsList from '../components/inventory/CarCardsList'
import { useDispatch } from 'react-redux'
import { setOnHome } from '../store/homePage/homeReducer'

function Inventory() {
  const dispatch=useDispatch()


  useEffect(()=>{
    dispatch(setOnHome(false))
   },[dispatch])

  return (
    <div>
        <Nav/>
        <div className='m-6'>
            <Info/>
            <CarCardsList/>
        </div>
        
    </div>
  )
}

export default Inventory