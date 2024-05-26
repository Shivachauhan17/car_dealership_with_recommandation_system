import React from 'react'
import { IoMdClose } from "react-icons/io";
import {useSelector,useDispatch} from 'react-redux'
import {setDealDescription,setDealDiscount,setShowDealPopUp} from '../../store/homePage/homeReducer'

function CreateDeal() {
    const showPopUp=useSelector(state=>state.home.showDealPopUp)
    const dispatch=useDispatch()
    const dealDescription=useSelector(state=>state.home.dealDescription)
    const dealDiscount=useSelector(state=>state.home.dealDiscount)
    const [dealDescriptionValidation,setDealDescriptionValidation]=useState(false)
    console.log(dealDescriptionValidation)
    const [error,setError]=useState({
      description:""
    })

    const validateDealDescription=()=>{
      const words=dealDescription.split(/\s+/).length
      if(words>50){
        setDealDescriptionValidation(true)
      }
      else{
        setDealDescriptionValidation(false)
        setError({
          ...error,
          description:"use atleast 50 words about deal"
        })
      }
    }

    useEffect(()=>{
      validateDealDescription()
    },[dealDescription])

  return (
    <div className='fixed mt-10 w-[400px] lg:max-w-md mx-auto top-[100px] left-0 right-0 shadow-xl'>
          <form  className="pb-8 bg-white text-orange-500 mt-2 space-y-4 max-w-md mx-auto p-4 border border-gray-300 rounded">
          <div className='flex justify-between justify-items-center'>
            <h2 className='text-3xl text-orange-500 font-bold font-sans'>Fill Deal Details</h2>
            
            <IoMdClose onClick={()=>{setShowDealPopUp(false)}} className='text-2xl font-bold hover:cursor-pointer'/>

          </div>
          <div>
          <p className='text-black font-semibold'>{item.name}</p>
          </div>
          <div>
              <label>Deal Description:</label>
              <input
              type="text"
              name="description"
              value={dealDescription}
              onChange={(e)=>{dispatch(setDealDescription(e.target.value))}}
              className="text-black w-full p-2 border border-gray-300 rounded"
              />
              {!dealDescriptionValidation && <p className="text-red-500 text-sm">{error.description}</p>}
          </div>
          <div>
              <label>Discount If Any:</label>
              <input
              type="number"
              name="discount"
              min='0'
              max={`${item.car_info.price}`}
              value={dealDiscount}
              onChange={(e)=>{dispatch(setDealDiscount(e.target.value))}}
              className="text-black w-full p-2 border border-gray-300 rounded"
              />
          </div>
          
          {dealDescriptionValidation 
            ?<button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">Add</button>
            :<button type="submit" className="w-full bg-slate-300  text-white p-2 rounded">Add</button>
          }
          </form>
          </div>
  )
}

export default CreateDeal