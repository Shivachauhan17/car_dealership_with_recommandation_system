import React from 'react'
import {gql,useQuery} from '@apollo/client'
import Loader from '../Loader'
import Error from '../Error'
import Swal from 'sweetalert2';
import { SiPagespeedinsights } from "react-icons/si";
import { LiaRupeeSignSolid } from "react-icons/lia";



const GET_ALL_CARS=gql`
    query {viewAllCars{
        name
        type    
        model
        car_info{
            price
            milage
            description
        }
    }}
`

function AllCars() {
    const { loading, error, data } = useQuery(GET_ALL_CARS)
    console.log(data)

    if(error){
        Swal.fire({
            icon:'error',
            title:'Oops..',
            text:"error in fetching the data the of all cars"
          })

        return <Error text={"error in fetching the data the of all cars"} />
    }
    if(loading)
        return <Loader/>


  return (
    <div>
        <ul>
            {
               data.viewAllCars.map((item,index)=>(
                <li>
                    <h4>{item.name}</h4>
                    <div>
                        <div>
                            <LiaRupeeSignSolid />
                            <h3>{item.car_info.price}</h3>
                        </div>
                        <h4>{item.type}</h4>
                    </div>
                    <p>Year:{item.model}</p>
                    <div>
                        <SiPagespeedinsights/>
                        <p>{item.car_info.milage}</p>
                    </div>
                    <p>{item.car_info.description}</p>
                </li>
               )) 

            }
        </ul>
    </div>
  )
}

export default AllCars