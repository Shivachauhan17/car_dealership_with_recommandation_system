import { createSlice } from "@reduxjs/toolkit";


const initialState={
    deals:[],
    dealerShips:[]
}

const reducer=createSlice({
    name:'carDeals',
    initialState:initialState,
    reducers:{
        setDeals(state,action){
            return{
                ...state,
                deals:action.payload
            }
        },
        setDealerShips(state,action){
            return{
                ...state,
                dealerShips:action.payload
            }
        }
    }
})


export const {
    setDeals,
    setDealerShips
}=reducer.actions


export default reducer.reducer