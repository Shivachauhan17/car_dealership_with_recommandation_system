import React from 'react'
import Info from './inventory/Info'
import CarCardsList from './inventory/CarCardsList'

function Inventory({isInventory,dealership_email}) {
  
  return (
    <div className={` w-[100vw] ${isInventory?'translate-x-0':'-translate-x-full'}`}>
        <div className='w-[87%] my-0 mx-auto'>
            <Info  dealership_email={dealership_email}/>
            <CarCardsList/>
        </div>
    </div>
  )
}

export default Inventory