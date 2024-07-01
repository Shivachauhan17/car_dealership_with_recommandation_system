import React,{useState} from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { gql,useQuery } from '@apollo/client';
import { MdModeEdit } from "react-icons/md";

import Swal from 'sweetalert2';

const GET_RATING=gql`
    query GetRating($carID:String!){
        getRating(carID:$carID)
    }
`

function Rating({carID}) {
    const [rating,setRating]=useState(0)
    const [edit,setEdit]=useState(false)
    const variables={
        carID:carID
    }
    const { loading, error, data }=useQuery(GET_RATING,{
        variables:variables,
        onCompleted:(data)=>{
            console.log(data)
            setRating(data.getRating)
        }
    })

    if(rating===0){
        return (
        <div className='flex justify-start items-center mt-3 text-2xl '>
            <div className='flex justify-start items-center  '>
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
            </div>
            <div className='px-2 text-2xl font-bold flex justify-start items-center gap-1'>
                <MdModeEdit  size={24} onClick={()=>{setEdit(!edit)}}/>
                {
                    edit?
                    <select
                        className='h-8 font-normal text-lg bg-transparent border-[1px] border-gray-500 rounded-md outline-none'
                     id="evenNumbers" name="evenNumbers" onChange={(e)=>{setRating(Number(e.target.value))}}>
                        <option className='h-8' value="2">1</option>
                        <option className='h-8' value="4">2</option>
                        <option className='h-8' value="6">3</option>
                        <option className='h-8' value="8">4</option>
                        <option className='h-8' value="10">5</option>
                    </select>:null
                                }
                {
                    edit?
                    <button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white text-lg font-normal  p-[4px] py-[2px] rounded">
                    Submit
                    </button>
                    :null
                }
            </div>
    </div>)
    }
    if(rating===10){
        return (
            <div className='flex justify-start items-center mt-3 text-2xl '>
                <div className='flex justify-start items-center '>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <div className='px-2 font-bold flex justify-start items-center gap-1'>
                    <MdModeEdit onClick={()=>{setEdit(!edit)}}/>
                    {
                    edit?
                    <select
                        className='h-8 font-normal text-lg bg-transparent border-[1px] border-gray-500 rounded-md outline-none'
                     id="evenNumbers" name="evenNumbers" onChange={(e)=>{Number(setRating(e.target.value))}}>
                        <option className='h-8' value="2">1</option>
                        <option className='h-8' value="4">2</option>
                        <option className='h-8' value="6">3</option>
                        <option className='h-8' value="8">4</option>
                        <option className='h-8' value="10">5</option>
                    </select>:null
                                }
                                {
                    edit?
                    <button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">
                    Submit
                    </button>
                    :null
                }
                </div>
            </div>
          )
    }

    return(
        <div className='flex justify-start items-center mt-3 text-2xl '>
            <div className='flex justify-start items-center '>
                <FaStar />
                {
                    rating===4 || rating>4?
                    <FaStar />
                    :<FaRegStar/>
                }
                {
                    rating===6 || rating >6?
                    <FaStar />
                    :<FaRegStar/>
                }
                {
                    rating===8 || rating>8?
                    <FaStar />
                    :<FaRegStar/>
                }
                <FaRegStar/>
            </div>
            <div className='px-2 font-bold flex justify-start items-center gap-1'>
                <MdModeEdit onClick={()=>{setEdit(!edit)}}/>
                {
                    edit?
                    <select
                        className='h-8 font-normal text-lg bg-transparent border-[1px] border-gray-500 rounded-md outline-none'
                     id="evenNumbers" name="evenNumbers" onChange={(e)=>{setRating(Number(e.target.value))}}>
                        <option className='h-8' value="2">1</option>
                        <option className='h-8' value="4">2</option>
                        <option className='h-8' value="6">3</option>
                        <option className='h-8' value="8">4</option>
                        <option className='h-8' value="10">5</option>
                    </select>:null
                                }
                                {
                    edit?
                    <button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">
                    Submit
                    </button>
                    :null
                }
            </div>
        </div>
    )

  
}

export default Rating