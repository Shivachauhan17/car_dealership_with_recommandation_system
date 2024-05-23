import {createSlice} from '@reduxjs/toolkit'

const initialState={
    filterWord:"",
    allCars:[],
    filteredCars:[]

}

const reducer=createSlice({
    name:'homePage',
    initialState:initialState,
    reducers:{
        setFilterWord(state,action){
            return{
                ...state,
                filterWord:action.payload
            }
        },
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
        }
    }
    
})

export const {
    setFilterWord,
    setAllCars,
    setFilteredCars
}=reducer.actions

export default reducer.reducer