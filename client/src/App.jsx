import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import LoginSignup from './pages/LoginSignup'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Inventory from './pages/Inventory'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<LoginSignup/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/home' exact element={<Home/>}/>
        <Route path='/inventory' exact element={<Inventory/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App