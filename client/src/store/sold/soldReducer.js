import {createSlice} from '@reduxjs/toolkit'


const initialState={
    allSold:[],
    filteredSold:[],
    isFiltered:false,
    filterCategory:"All Categories",

}


const reducer=createSlice({
    name:'sold',
    initialState:initialState,
    reducers:{
        setAllSold(state,action){
            return{
                ...state,
                allSold:action.payload
            }
        },
        setFilteredSold(state,action){
            return{
                ...state,
                filteredSold:action.payload
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
        }
    }
})

export const {
    setAllSold,
    setFilteredSold,
    setIsFiltered,
    setFilterCategory
    } = reducer.actions;
  

export default reducer.reducer