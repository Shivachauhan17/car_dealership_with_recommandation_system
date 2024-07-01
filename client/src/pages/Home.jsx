import React from 'react'
import AllCars from '../components/home/AllCars'
import Nav from '../components/Nav'
import Filter from '../components/home/Filter'
import RecommandedCarList from '../components/home/RecommandedCarList'

function Home() {
  return (
    <div>
        <Nav/>
        <div className='m-6'>
          <Filter/>
          <RecommandedCarList/>
          <AllCars/>
        </div>
        
    </div>
  )
}

export default Home