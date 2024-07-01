import React,{memo,useCallback,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CreateDeal from './CreateDeal'
import CarCard from './CarCard'
import InfiniteScroll from "react-infinite-scroll-component";
import {setPage,setCarsOnPage,setHasMore,setOnHome} from '../../store/homePage/homeReducer'


function CarCardsList() {
   const dispatch=useDispatch()
   const isFiltered=useSelector(state=>state.home.isFiltered)
   const cars=useSelector(state=>state.home.allCars)
  const filteredCars=useSelector(state=>state.home.filteredCars)
  const showPopUp=useSelector(state=>state.home.showDealPopUp)
   const limit=10
  const page=useSelector(state=>state.home.page)
  const carsOnPage=useSelector(state=>state.home.carsOnPage)
  const hasMore=useSelector(state=>state.home.hasMore)

   const pagination=useCallback((newPage)=>{
      
      const startIndex=(page)*limit
      const endIndex=(page)*limit+10>cars.length?cars.length:(page)*limit+10
      const items=cars.slice(startIndex,endIndex)
      
      const newItems=[...carsOnPage, ...items];
      dispatch(setCarsOnPage(newItems))
      dispatch(setPage(newPage))
   },[cars,carsOnPage,limit,dispatch])
   
//   useEffect(()=>{
//    pagination()
//   },[page])

  useEffect(()=>{
   const handleScroll=()=>{
      if(!isFiltered){
      const {scrollTop, clientHeight, scrollHeight}=document.documentElement;
      if(scrollTop+clientHeight>=scrollHeight-50){
         
         pagination(page+1)

      }
   }
   }
   window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[pagination,page,isFiltered])

  useEffect(()=>{
   dispatch(setCarsOnPage(cars.slice(0,limit)))
  },[cars])

  useEffect(()=>{
   dispatch(setOnHome(true))
  },[dispatch])

  return (
   <div>
   <h3 className='font-bold text-xl'>All Cars</h3>
    <ul  className='flex flex-col justify-start lg:flex lg:flex-row lg:flex-wrap lg:justify-around '>
            {isFiltered
               ?filteredCars.map((item,index)=>(
                  <CarCard key={index} item={item} />
               ))
               :carsOnPage.map((item,index)=>(
                  <CarCard key={index} item={item} />
               )) 

            }
        </ul>
        {
         showPopUp
         ?<CreateDeal/>
         :null
        }
        </div>
  )
}

export default memo(CarCardsList)