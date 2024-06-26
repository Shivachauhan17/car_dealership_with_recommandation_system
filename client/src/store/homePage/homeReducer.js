import {createSlice} from '@reduxjs/toolkit'

const initialState={
    filterWord:"",
    allCars:[],
    filteredCars:[],
    page:1,
    carsOnPage:[],
    hasMore:true,

    showDealPopUp:false,
    dealDescription:"",
    dealDiscount:0,
    selectedCar4Deal:{},
    isFiltered:false,
    //for utilizing same car card compoennt
    onHome:false,
    recommandedCars:[]

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
        },
        setPage(state,action){
            return{
                ...state,
                page:action.payload
            }
        },
        setCarsOnPage(state,action){
            return{
                ...state,
                carsOnPage:action.payload
            }
        },
        setHasMore(state,action){
            return{
                ...state,
                hasMore:action.payload
            }
        },
        setIsFiltered(state,action){
            return{
                ...state,
                isFiltered:action.payload
            }
        },
        setOnHome(state,action){
            return{
                ...state,
                onHome:action.payload
            }
        },
        setRecommandedCars(state,action){
            return{
                ...state,
                recommandedCars:action.payload
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
    setSelectedCar4Deal,
    setPage,
    setCarsOnPage,
    setHasMore,
    setIsFiltered,
    setOnHome,
    setRecommandedCars
}=reducer.actions

export default reducer.reducer