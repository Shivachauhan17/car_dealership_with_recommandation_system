import React from 'react'
import Nav from '../components/Nav'
import Info from '../components/inventory/Info'


function Inventory() {
  return (
    <div>
        <Nav/>
        <div className='m-6'>
            <Info/>
        </div>
        
    </div>
  )
}

export default Inventory