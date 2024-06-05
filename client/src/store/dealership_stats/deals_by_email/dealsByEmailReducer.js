import {createSlice} from '@reduxjs/toolkit'


const initialState={
    allDeals:[],
    filteredDeals:[],
    isFiltered:false,
    filterCategory:"All Categories",

}


const reducer=createSlice({
    name:'dealsByEmail',
    initialState:initialState,
    reducers:{
        setAllDeals(state,action){
            return{
                ...state,
                allDeals:action.payload
            }
        },
        setFilteredDeals(state,action){
            return{
                ...state,
                filteredDeals:action.payload
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
    setAllDeals,
    setFilteredDeals,
    setIsFiltered,
    setFilterCategory
    } = reducer.actions;
  

export default reducer.reducer