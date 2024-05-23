import {createSlice} from '@reduxjs/toolkit'


const initialState={
    loginEmail:"",
    loginPassword:"",
    loginRole:"dealership",

    name:"",
    regEmail:"",
    phoneNumber:null,
    regPassword:"",
    regRole:"dealership",
    location:"",
    dealerInfo:"",
    userInfo:"",

}


const reducer=createSlice({
    name:'loginRegisterForm',
    initialState:initialState,
    reducers:{
        setLoginEmail(state,action){
            return {
                ...state,
                loginEmail:action.payload
            }
        },
        setLoginPassword(state, action) {
            return {
              ...state,
              loginPassword: action.payload
            };
          },
          setLoginRole(state, action) {
            return {
              ...state,
              loginRole: action.payload
            };
          },
          setName(state, action) {
            return {
              ...state,
              name: action.payload
            };
          },
          setRegEmail(state, action) {
            return {
              ...state,
              regEmail: action.payload
            };
          },
          setPhoneNumber(state, action) {
            return {
              ...state,
              phoneNumber: action.payload
            };
          },
          setRegPassword(state, action) {
            return {
              ...state,
              regPassword: action.payload
            };
          },
          setRegRole(state, action) {
            return {
              ...state,
              regRole: action.payload
            };
          },
          setLocation(state, action) {
            return {
              ...state,
              location: action.payload
            };
          },
          setDealerInfo(state, action) {
            return {
              ...state,
              dealerInfo: action.payload
            };
          },
          setUserInfo(state, action) {
            return {
              ...state,
              userInfo: action.payload
            };
          }
    }
})

export const {
    setLoginEmail,
    setLoginPassword,
    setLoginRole,
    setName,
    setRegEmail,
    setPhoneNumber,
    setRegPassword,
    setRegRole,
    setLocation,
    setDealerInfo,
    setUserInfo
    } = reducer.actions;
  

export default reducer.reducer