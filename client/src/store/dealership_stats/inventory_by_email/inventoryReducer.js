import {createSlice} from '@reduxjs/toolkit'


const initialState={
    allCars:[],
    filteredCars:[],
    isFiltered:false,
    filterCategory:"All Categories",
    allCategories:[]

}


const reducer=createSlice({
    name:'inventoryByEmail',
    initialState:initialState,
    reducers:{
        setAllCars(state,action){
            return{
                ...state,
                allCars:action.payload
            }
        },
        setFilteredCars(state,action){
            return{
                ...state,
                filteredCars:action.payload
            }
        },
        setIsFiltered(state,action){
            return{
                ...state,
                isFiltered:action.payload
            }
        },
        setFilterCategory(state,action){
            return{
                ...state,
                filterCategory:action.payload
            }
        },
        setAllCategories(state,action){
            return{
                ...state,
                allCategories:action.payload
            }
        }
        
    }
})

export const {
    setAllCars,
    setFilteredCars,
    setIsFiltered,
    setFilterCategory,
    setAllCategories
    } = reducer.actions;
  

export default reducer.reducer