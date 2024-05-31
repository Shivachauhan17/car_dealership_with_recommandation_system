import React,{useEffect,memo} from 'react'
import {useQuery, gql} from '@apollo/client'
import { useSelector,useDispatch } from 'react-redux'
import {setallMine,setFilteredMine,setFilterCategory,setIsFiltered  } from '../../store/my_vehicle/myVehicleReducer'
import { setAllCategories } from '../../store/inventory/inventoryReducer'

import Swal from 'sweetalert2'

const OWNED_BY_USER=gql`
    query {
        vehicleOwnedByUser{
            id
            car_id {
                id
                type
                name
                model
                car_info {
                    price
                    milage
                    description
                }
            }
        }
    }
`

const GET_CATEGORIES=gql`
    query {
        getCategories
    }
`

function Info() {
    const allMine=useSelector(state=>state.mine.allMine)
    const filterCategory=useSelector(state=>state.mine.filterCategory)
    const filteredMine=useSelector(state=>state.mine.filteredMine)
    console.log(filteredMine)
    const allCategories=useSelector(state=>state.inventory.allCategories)
    

    const dispatch=useDispatch()
    const { data, loading, error } = useQuery(OWNED_BY_USER, {
        onCompleted: (data) => {
          dispatch(setallMine(data.vehicleOwnedByUser))
          dispatch(setFilteredMine(data.vehicleOwnedByUser))
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
          dispatch(setallMine(data.vehicleOwnedByUser))
          dispatch(setFilteredMine(data.vehicleOwnedByUser))
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
            dispatch(setFilteredMine(allMine))
        }
        else{
            dispatch(setFilteredMine(allMine.filter(elem=>elem.car_id.type===filterCategory)))
            dispatch(setIsFiltered(true))}
        

      },[filterCategory,dispatch])

  
  return (
    <div className='h-[100px] m-2 flex justify-between lg:justify-around items-center lg:text-xl '>
        <div className='flex flex-col justify-start gap-[5px] justify-items-start'>
            <div className='border-[2px] text-orange-400 border-orange-400 h-16 w-48 lg:w-64 flex justify-center items-center'>
                <div className='p-4 font-semibold   flex justify-start items-end gap-[5px] '>
                    <p>Cars In Selected CateGory: </p>
                    <p>{filteredMine.length}</p>
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
                <p>{allMine.length}</p>
            </div>
        </div>
    </div>
  )
}

export default memo(Info)