import React from 'react'

function Deals({isInventory,dealership_email}) {
  return (
    <div className={` w-[100vw] ${isInventory?'translate-x-full':'translate-x-0'}`}>
        Deals
    </div>
  )
}

export default Deals