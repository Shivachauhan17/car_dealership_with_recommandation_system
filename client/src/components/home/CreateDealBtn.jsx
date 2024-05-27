import React,{memo,useEffect,useState} from 'react'
import {setShowDealPopUp,setSelectedCar4Deal} from '../../store/homePage/homeReducer'
import { useDispatch,useSelector } from 'react-redux'


function CreateDealBtn({item}) {
  const dispatch=useDispatch()
  const showPopUp=useSelector(state=>state.home.showDealPopUp)
  // useEffect(()=>{
  //   dispatch(setSelectedCar4Deal(item))
  // },[showPopUp])
    
  return (
    <div >
        <button className='rounded-md bg-sky-400 hover:bg-sky-300 p-[5px] px-[10px] mt-2 font-semibold text-white' onClick={()=>{dispatch(setShowDealPopUp(true));dispatch(setSelectedCar4Deal(item))}}>Create Deal</button>         
    </div>
  )
}

export default memo(CreateDealBtn)