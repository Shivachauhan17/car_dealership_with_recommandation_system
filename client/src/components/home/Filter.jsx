import React,{memo,useCallback,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {setFilterWord,setFilteredCars} from '../../store/homePage/homeReducer'



function Filter() {
    const dispatch=useDispatch()
    const filterWord=useSelector(state=>state.home.filterWord)
    const filteredCars=useSelector(state=>state.home.filteredCars)
    const allCars=useSelector(state=>state.home.allCars)

    const regexFilter=useCallback(()=>{
        const fuzzyPattern = filterWord.split('').join('.*')
        const regex = new RegExp(`.*${fuzzyPattern}.*`, 'i')

        // Filter the list of mobiles
        const filtered= allCars.filter(car => regex.test(car.name));
        dispatch(setFilteredCars(filtered))
    },[filterWord,allCars,dispatch])

    useEffect(()=>{
        regexFilter()
    },[filterWord,regexFilter])

  return (
    <div>
        <input 
        className='border-b-[2px] border-b-orange-300 w-2/3 outline-0	'
        placeholder='Search From Name....' value={filterWord} onChange={(e)=>{dispatch(setFilterWord(e.target.value));
            
        }}/>        
    </div>
  )
}

export default memo(Filter)