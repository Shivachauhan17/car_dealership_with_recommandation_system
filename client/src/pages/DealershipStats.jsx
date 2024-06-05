import React,{useState} from 'react'
import Nav from '../components/Nav'
import Inventory from '../components/dealership_stats/Inventory'
import Deals from '../components/dealership_stats/Deals'
import { useParams } from 'react-router-dom'

function DealershipStats() {
    const {dealership_email}=useParams()
    const [isInventory,setIsInventory]=useState(true)


  return (
    <div>
        <Nav/>
        <div>
            <div className='flex justify-center items-center gap-10 p-6'>
                <h4 className={
                    ` text-lg font-bold hover:cursor-pointer  ${isInventory?"border-b-4 border-orange-400 text-slate-600":"border-b-4 border-white"}`
                    }
                    onClick={()=>{setIsInventory(true)}}
                    >Inventory</h4>
                <h4 className={
                    `text-lg font-bold hover:cursor-pointer  ${!isInventory?"border-b-4 border-orange-400 text-slate-600":"border-b-4 border-white"}`
                    }
                    onClick={()=>{setIsInventory(false)}}
                    >Deals</h4>
            </div>
            <div className='overflow-x-hidden'>
                <Inventory isInventory={isInventory} dealership_email={dealership_email}/>
                <Deals isInventory={isInventory} dealership_email={dealership_email}/>
            </div>
        </div>
        
    </div>
  )
}

export default DealershipStats