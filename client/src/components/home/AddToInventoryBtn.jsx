import React from 'react'
import {gql,useQuery} from '@apollo/client'


const ADD_CAR_TO_DEALERSHIP=gql`
    AddCarToDealership($carID:String!,){
        addCarToDealership()
    }
`


function AddToInventoryBtn({item}) {
  return (
    <button className='rounded-md bg-sky-400 hover:bg-sky-300 p-[5px] px-[10px] mt-2 font-semibold text-white'>Add To Inventory</button>
  )
}

export default AddToInventoryBtn