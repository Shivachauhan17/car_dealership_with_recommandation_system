import React,{memo} from 'react'
import {gql,useQuery} from '@apollo/client'
import Loader from '../Loader'
import Error from '../Error'
import Swal from 'sweetalert2';

import {setAllCars,
    setFilteredCars} from '../../store/homePage/homeReducer'
import { useDispatch,useSelector } from 'react-redux';
import CarCardsList from './CarCardsList';

const GET_ALL_CARS=gql`
    query {viewAllCars{
        id
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
    const dispatch=useDispatch()
    const { loading, error, data } = useQuery(GET_ALL_CARS,{
        fetchPolicy: 'network-only'
    })    

    if(error){
        Swal.fire({
            icon:'error',
            title:'Oops..',
            text:"error in fetching the data the of all cars"
          })

        return <Error text={"error in fetching the data the of all cars"} />
    }
    else if(loading)
        return <Loader/>
    else{
        dispatch(setAllCars(data.viewAllCars))
        dispatch(setFilteredCars(data.viewAllCars))
    }

  return (
    <div className='flex justify-center'>
        <CarCardsList/>
    </div>
  )
}

export default memo(AllCars)