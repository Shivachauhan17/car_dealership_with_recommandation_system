import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import LoginSignup from './pages/LoginSignup'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import MyDeals from './pages/MyDeals'
import Sold from './pages/Sold'
import MyVehicle from './pages/MyVehicle'
import DealsOnCar from './pages/DealsOnCar'
import DealershipStats from './pages/DealershipStats'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<LoginSignup/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/home' exact element={<Home/>}/>
        <Route path='/inventory' exact element={<Inventory/>}/>
        <Route path='/myDeals' exact element={<MyDeals/>}/>
        <Route path='/sold' exact element={<Sold/>}/>
        <Route path='/myVehicle' exact element={<MyVehicle/>}/>
        <Route path="/deal_on_car/:carID" element={<DealsOnCar />} />
        <Route path="/dealership_stats/:dealership_email" element={<DealershipStats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App