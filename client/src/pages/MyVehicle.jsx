import React from 'react'
import Nav from '../components/Nav'
import Info from '../components/my_vehicle/Info'
import MyVehicleCardList from '../components/my_vehicle/MyVehicleCardList'

function MyVehicle() {
  return (
    <div>
        <Nav/>
        <div className='m-6'>
            <Info/>
            <MyVehicleCardList/>
        </div>
    </div>
  )
}

export default MyVehicle