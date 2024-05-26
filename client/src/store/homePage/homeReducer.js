import {createSlice} from '@reduxjs/toolkit'

const initialState={
    filterWord:"",
    allCars:[],
    filteredCars:[],

    showDealPopUp:false,
    dealDescription:"",
    dealDiscount:0,
    selectedCar4Deal:{}

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
        },
        setDealDescription(state,action){
            return{
                ...state,
                dealDescription:action.payload
            }
        },
        setDealDiscount(state,action){
            return{
                ...state,
                dealDiscount:action.payload
            }
        },
        setShowDealPopUp(state,action){
            return{
                ...state,
                showDealPopUp:action.payload
            }
        },
        setSelectedCar4Deal(state,action){
            return{
                ...state,
                selectedCar4Deal:action.payload
            }
        }
    }
    
})

export const {
    setFilterWord,
    setAllCars,
    setFilteredCars,
    setDealDescription,
    setDealDiscount,
    setShowDealPopUp,
    setSelectedCar4Deal
}=reducer.actions

export default reducer.reducer