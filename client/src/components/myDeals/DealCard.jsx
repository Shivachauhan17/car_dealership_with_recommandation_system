import React,{memo} from 'react'
import { SiPagespeedinsights } from "react-icons/si";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { useMutation,gql } from '@apollo/client';
import { useSelector,useDispatch } from 'react-redux';
import { setAllDeals,setFilteredDeals} from '../../store/myDeals/dealReducer'
import Swal from 'sweetalert2';

const DELETE_DEAL_FROM_DEALERSHIP=gql`
            mutation DeleteDealFromDealership($dealID:String!){
                deleteDealFromDealership(dealID:$dealID)
            }
        `

function DealCard({item,deal,id}) {
    const userType=localStorage.getItem('userType')
    const dispatch=useDispatch()
    const deals=useSelector(state=>state.deal.allDeals)
    const filteredDeals=useSelector(state=>state.deal.filteredDeals)

    const [removeDeal]=useMutation(DELETE_DEAL_FROM_DEALERSHIP,{
        onError:(error)=>{
            Swal.fire({
                icon:'error',
                title:'Oops..',
                text:"some unexpected error while removing report occured please report"
              })
        },
        onCompleted:(data)=>{
            const result=data.deleteDealFromDealership
            if(result.error){
              Swal.fire({
                icon:'error',
                title:'Oops..',
                text:result.error
              })
            }
            else{

              Swal.fire({
                icon:'success',
                title:'Success!',
                text:result
              })
      
              
             
            }
          }
    })

    const removeDealershipDeal=(e)=>{
        e.preventDefault()
        removeDeal({variables:{dealID:id}})
        dispatch(setAllDeals(deals.filter(elem=>elem.id!==id)))
        dispatch(setFilteredDeals(filteredDeals.filter(elem=>elem.id!==id)))
    }

  
  return (
    <li className='transition duration-500 ease-in-out border-[1px] border-slate-200 my-4 p-10 hover:shadow-md rounded-lg hover:bg-orange-300 lg:w-[500px]'>
                    <h4 className='font-bold text-xl'>{item.name}</h4>
                    <div className='font-semibold text-md flex justify-between justify-items-center'>
                        <div className='flex justify-center justify-items-center'>
                            
                            <LiaRupeeSignSolid className='text-xl'/>
                            <h3>{item.car_info.price}</h3>
                        </div>
                        <div >
                            <h3><span className='font-bold'>Discount:</span> {deal.discount}</h3>
                        </div>
                        <h4 className='p-1 px-2 text-black border-[1px] border-black font-normal rounded-lg'>{item.type}</h4>
                    </div>
                    <p className='text-md font-semibold'>Year:{item.model}</p>
                    <div className='text-md font-semibold flex justify-start justify-items-center gap-1'>
                        <SiPagespeedinsights className='text-xl'/>
                        <p>{item.car_info.milage}</p>
                    </div>
                    <div className='font-semibold text-slate-500'><span className='font-bold '>Deal Description: </span ><p className='line-clamp-4 hover:line-clamp-none'>{deal.description}</p></div>
                    {userType!=="user"
                    ?<div className='flex justify-between justify-items-center'>
                        <MdDelete className='text-3xl mt-4 hover:cursor-pointer hover:text-slate-600' onClick={removeDealershipDeal}/>
                    </div>
                    :null}
                    
                </li>
  )
}

export default memo(DealCard)