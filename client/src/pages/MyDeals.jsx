import React from 'react'
import Info from '../components/myDeals/Info'
import Nav from '../components/Nav'
import DealCardList from '../components/myDeals/DealCardList'

function MyDeals() {
  return (
    <div>
        <Nav/>
        <div className='m-6'>
            <Info/>
            <DealCardList/>
        </div>
    </div>
  )
}

export default MyDeals