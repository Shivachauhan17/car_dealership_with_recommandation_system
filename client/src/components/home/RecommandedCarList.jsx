import React,{memo} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CarCard from './CarCard'
import {setRecommandedCars} from '../../store/homePage/homeReducer'
import {gql,useQuery} from '@apollo/client'
import Swal from 'sweetalert2'

const GET_RECOMMANDED=gql`
    query {
        recommandedCars{
            id
            name
            type    
            model
            car_info{
                price
                milage
                description
            }
        }
    }
`

function RecommandedCarList() {
    const dispatch=useDispatch()
    const { loading, error, data }=useQuery(GET_RECOMMANDED,{
        onError:(error)=>{
            Swal.fire({
                icon:'error',
                title:'Oops..',
                text:"error in fetching the data of the recommanded cars"
              })
        },
        onCompleted:(data)=>{
            const result=data.recommandedCars
            dispatch(setRecommandedCars(result))
        }
    })
   
   const recommandedCars=useSelector(state=>state.home.recommandedCars)
   
  return (
   <div>
        <h3 className='font-bold text-xl'>Recommanded Cars</h3>
        <ul  className='flex flex-col justify-start lg:flex lg:flex-row lg:flex-wrap lg:justify-around '>
        {recommandedCars.length>0?
            recommandedCars.map((item,index)=>{
                return  <CarCard key={index} item={item} />
            })
           
            :<p>No Recommanded Cars.</p>
        }      
        </ul>
        
        </div>
  )
}

export default memo(RecommandedCarList)