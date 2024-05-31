import React from 'react'
import Info from '../components/sold/Info'
import Nav from '../components/Nav'
import SoldCarCardList from '../components/sold/SoldCarCardList'

function Sold() {
  return (
    <div>
        <Nav/>
        <div className='m-6'>
            <Info/>
            <SoldCarCardList/>
        </div>
    </div>
  )
}

export default Sold