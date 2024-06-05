import React,{useEffect} from 'react'
import {gql,useQuery} from '@apollo/client'
import { useSelector,useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { setAllCars,setFilteredCars,setFilterCategory,setAllCategories,setIsFiltered } from '../../../store/dealership_stats/inventory_by_email/inventoryReducer'


const GET_CATEGORIES=gql`
    query {
        getCategories
    }
`
//inventoryByEmail
function Info({dealership_email}) {

    const CARS_BY_DEALERSHIP_BY_EMAIL=gql`
        query carsOfCertainDealershipByEmail($dealership_email:String!){
            carsOfCertainDealershipByEmail(dealership_email:$dealership_email){
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

    const cars=useSelector(state=>state.inventoryByEmail.allCars)
    const filterCategory=useSelector(state=>state.inventoryByEmail.filterCategory)
    const filteredCars=useSelector(state=>state.inventoryByEmail.filteredCars)
    const allCategories=useSelector(state=>state.inventoryByEmail.allCategories)

    const variables={
        dealership_email:dealership_email
    }

    const dispatch=useDispatch()
    const { data, loading, error } = useQuery(CARS_BY_DEALERSHIP_BY_EMAIL, 
        
        {
            variables:variables,
        onCompleted: (data) => {
          dispatch(setAllCars(data.carsOfCertainDealershipByEmail))
        },
        onError: (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: "Error in fetching the data of Cars in Inventory"
          })
        }
      })

      const {data:catData,loading:catLoading,error:catError}=useQuery(GET_CATEGORIES,{
        onError: (error) => {
            console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops..',
              text: "Error in fetching the data of Cars in Inventory"
            })
          }
      })

      useEffect(() => {
        if (data) {
          dispatch(setAllCars(data.carsOfCertainDealershipByEmail))
          dispatch(setFilteredCars(data.carsOfCertainDealershipByEmail))
        }
      }, [data, dispatch])

      useEffect(()=>{
        if (catData && catData.getCategories) {
            dispatch(setAllCategories(catData.getCategories))
          }
      },[dispatch,catData])
   
      useEffect(()=>{
        if(filterCategory==="All Categories"){
            dispatch(setIsFiltered(false))
            dispatch(setFilteredCars(cars))
        }
        else{
            dispatch(setFilteredCars(cars.filter(elem=>elem.type===filterCategory)))
            dispatch(setIsFiltered(true))}
        

      },[filterCategory,dispatch])

  
  return (
    <div className='h-[100px] m-2 flex justify-between lg:justify-around items-center lg:text-xl '>
        <div className='flex flex-col justify-start gap-[5px] justify-items-start'>
            <div className='border-[2px] text-orange-400 border-orange-400 h-16 w-48 lg:w-64 flex justify-center items-center'>
                <div className='p-4 font-semibold   flex justify-start items-end gap-[5px] '>
                    <p>Cars In Selected CateGory: </p>
                    <p>{filteredCars.length}</p>
                </div>
            </div>
            <div className='lg:hidden'>
                <select value={filterCategory} className="text-black w-full p-2 border border-gray-300 rounded outline-none" 
                onChange={(e)=>{
                    dispatch(setFilterCategory(e.target.value));

                    }}>
                    <option value={null}>All Categories</option>
                    {
                        allCategories.map((item,index)=>(<option value={item}>{item.toUpperCase()}</option>))
                    }
                </select>
            </div>
        </div>
        
        <div className='hidden w-82 lg:flex justify-center gap-[5px] items-center '>
            <p className='text-xl text-orange-400 font-semibold whitespace-nowrap ' >Choose A Category: </p>
            <select value={filterCategory} className="text-black w-full p-2 border border-gray-300 rounded outline-none" 
            onChange={(e)=>{
                dispatch(setFilterCategory(e.target.value));

                }}>
                <option value={null}>All Categories</option>
                {
                    allCategories.map((item,index)=>(<option value={item}>{item.toUpperCase()}</option>))
                }
            </select>
            
        </div>
        
        <div className='border-[2px] text-orange-400 border-orange-400 h-16 w-48 lg:w-64 flex justify-center items-center'>
            <div className='p-4 font-semibold   flex justify-start items-end gap-[5px] '>
                <p>Total In Inventory</p>
                <p>{cars.length}</p>
            </div>
        </div>
    </div>
  )
}

export default Info