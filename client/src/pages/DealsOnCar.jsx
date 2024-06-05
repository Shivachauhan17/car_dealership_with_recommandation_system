import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import CarsDeals from '../components/deals_on_car/CarsDeals';
import DealershipsDeals from '../components/deals_on_car/DealershipsDeals';
import Nav from '../components/Nav';

function DealsOnCar() {
    const { carID } = useParams();
    const [isCarDeal,setIsCarDeal]=useState(true)

    
  return (
    <div>
        <Nav/>
        <div>
            <div className='flex justify-center items-center gap-10 p-6'>
                <h4 className={
                    `text-lg font-bold hover:cursor-pointer  ${isCarDeal?"border-b-4 border-orange-400 text-slate-600":"border-b-4 border-white"}`
                    }
                    onClick={()=>{setIsCarDeal(true)}}
                    >Deals On Car</h4>
                <h4 className={
                    `text-lg font-bold hover:cursor-pointer  ${!isCarDeal?"border-b-4 border-orange-400 text-slate-600":"border-b-4 border-white"}`
                    }
                    onClick={()=>{setIsCarDeal(false)}}
                    >Delership With Car</h4>
            </div>
            <div className='overflow-x-hidden'
                >
                <CarsDeals id={carID} isCarDeal={isCarDeal}/>
                <DealershipsDeals id={carID} isCarDeal={isCarDeal}/>
            </div>
        </div>
    </div>
  )
}

export default DealsOnCar