import React,{useEffect,memo} from 'react'
import {useQuery, gql} from '@apollo/client'
import { useSelector,useDispatch } from 'react-redux'
import { setAllDeals,setFilteredDeals,setIsFiltered,setFilterCategory } from '../../store/myDeals/dealReducer'
import {setAllCategories } from '../../store/inventory/inventoryReducer'

import Swal from 'sweetalert2'



const GET_CATEGORIES=gql`
    query {
        getCategories
    }
`

function Info({dealership_email}) {
    const DEALS_OF_DEALERSHIP=gql`
    query DealsOfCertainDealershipByEmail($dealership_email:String!){
        dealsOfCertainDealershipByEmail(dealership_email:$dealership_email){
            id
            car_id{
                
                    name
                    type
                    model
                    car_info{
                        price
                        milage
                        description
                    }
                }
                deal_info{
                    discount
                    description
                }
        }
    }
`

    const deals=useSelector(state=>state.dealsByEmail.allDeals)
    const filterCategory=useSelector(state=>state.dealsByEmail.filterCategory)
    const filteredDeals=useSelector(state=>state.dealsByEmail.filteredDeals)
    const allCategories=useSelector(state=>state.inventory.allCategories)
    const variables={
        dealership_email:dealership_email
    }

    const dispatch=useDispatch()
    const { data, loading, error } = useQuery(DEALS_OF_DEALERSHIP, {
        variables:variables,
        onCompleted: (data) => {
          dispatch(setAllDeals(data.dealsOfCertainDealershipByEmail))
          dispatch(setFilteredDeals(data.dealsOfCertainDealershipByEmail))
        },
        onError: (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: "Error in fetching the data of deals"
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

      useEffect(()=>{
        if (catData && catData.getCategories) {
            dispatch(setAllCategories(catData.getCategories))
          }
      },[dispatch,catData])

      useEffect(() => {
        if (data) {
          dispatch(setAllDeals(data.dealsOfCertainDealershipByEmail))
          dispatch(setFilteredDeals(data.dealsOfCertainDealershipByEmail))
        }
      }, [data, dispatch])

     
   
      useEffect(()=>{
        if(filterCategory==="All Categories"){
            dispatch(setIsFiltered(false))
            dispatch(setFilteredDeals(deals))
        }
        else{

            
            dispatch(setFilteredDeals(deals.filter(elem=>elem.car_id.type===filterCategory)))
            dispatch(setIsFiltered(true))}
        

      },[filterCategory,dispatch])

  
  return (
    <div className='h-[100px] m-2 flex justify-between lg:justify-around items-center lg:text-xl '>
        <div className='flex flex-col justify-start gap-[5px] justify-items-start'>
            <div className='border-[2px] text-orange-400 border-orange-400 h-16 w-48 lg:w-64 flex justify-center items-center'>
                <div className='p-4 font-semibold   flex justify-start items-end gap-[5px] '>
                    <p>Deals Of Selected CateGory: </p>
                    <p>{filteredDeals.length}</p>
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
                <p>Total Deals</p>
                <p>{deals.length}</p>
            </div>
        </div>
    </div>
  )
}

export default memo(Info)