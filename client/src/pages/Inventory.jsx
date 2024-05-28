import React from 'react'
import Nav from '../components/Nav'
import Info from '../components/inventory/Info'
import CarCardsList from '../components/inventory/CarCardsList'

function Inventory() {
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