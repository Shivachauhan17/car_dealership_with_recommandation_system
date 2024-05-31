import {createSlice} from '@reduxjs/toolkit'


const initialState={
    allMine:[],
    filteredMine:[],
    isFiltered:false,
    filterCategory:"All Categories",

}


const reducer=createSlice({
    name:'mine',
    initialState:initialState,
    reducers:{
        setallMine(state,action){
            return{
                ...state,
                allMine:action.payload
            }
        },
        setFilteredMine(state,action){
            return{
                ...state,
                filteredMine:action.payload
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
    setallMine,
    setFilteredMine,
    setIsFiltered,
    setFilterCategory
    } = reducer.actions;
  

export default reducer.reducer