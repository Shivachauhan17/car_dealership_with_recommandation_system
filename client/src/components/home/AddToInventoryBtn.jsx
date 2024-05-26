import React from 'react'
import {gql,useMutation} from '@apollo/client'
import Swal from 'sweetalert2';


const ADD_CAR_TO_DEALERSHIP=gql`
    mutation AddCarToDealership($carID:String!){
        addCarToDealership(carID:$carID)
    }
`


function AddToInventoryBtn({id}) {
    const variables={
      carID:id
    }

    const [addCar]=useMutation(ADD_CAR_TO_DEALERSHIP,{
      onError:(error)=>{
        console.log(error)
        let messages = 'An error occurred';
      Swal.fire({
        icon:'error',
        title:'Oops..',
        text:messages
      })
      },
      onCompleted:(data)=>{
        console.log(data)
        const result=data.addCarToDealership
      if(result.error){
        Swal.fire({
          icon:'error',
          title:'Oops..',
          text:result.error
        })
      }
      else{
        console.log(result)
        
        Swal.fire({
          icon:'success',
          title:'Success!',
          text:result
        })
        
      }
      }
    })

  return (
    <button className='rounded-md bg-sky-400 hover:bg-sky-300 p-[5px] px-[10px] mt-2 font-semibold text-white' onClick={()=>{addCar({variables:variables})}}>Add To Inventory</button>
  )
}

export default AddToInventoryBtn