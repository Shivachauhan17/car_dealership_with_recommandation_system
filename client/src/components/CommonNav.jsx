import React,{memo} from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

function CommonNav() {
    const userType = localStorage.getItem('userType');
  return (
    <div className='bg-slate-100 h-[60px] flex justify-between items-center '>
        <Logo/>
        <div className='flex justify-around items-center gap-[10px'>
            <div ><p className='h-fit'>All Cars</p></div>
            {userType==="user"?<div  ><p className='h-fit p-[9px] hover:bg-orange-400'>Dealer-Ships</p></div>:null}
            {userType==="user"?<div ><p className='h-fit p-[9px] hover:bg-orange-400'>My Vhicles</p></div>:null}
            {userType!=="user"?<div ><p className='h-fit p-[9px] hover:bg-orange-400'>Inventory</p></div>:null}
            {userType!=="user"?<div ><p className='h-fit p-[9px] hover:bg-orange-400'>Deals</p></div>:null}
            {userType!=="user"?<div ><p className=' h-fit p-[9px] hover:bg-orange-400'>Sold</p></div>:null}
            <button>LOGOUT</button>
        </div>

    </div>
  )
}

export default memo(CommonNav)