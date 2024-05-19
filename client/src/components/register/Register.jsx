// src/FormComponent.js
import React, { useState,memo,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'


const Register = () => {
  const dispatch=useDispatch()

  const [emailValidation,setEmailValidation]=useState(false)
  const [passwordValidation,setPasswordValidation]=useState(false)
  const [roleValidation,setRoleValidation]=useState(false)
  const [phoneValidation,setPhoneValidation]=useState(false)
  const [locationValidation,setLocationValidation]=useState(false)
  const [dealerInfoValidation,setDealerInfoValidation]=useState(false)
  const [userInfoValidation,setUserInfoValidation]=useState(false)

  const name=useSelector(state=>state.form.name)
  const regEmail=useSelector(state=>state.form.regEmail)
  const phoneNumber=useSelector(state=>state.form.phoneNumber)
  const regPassword=useSelector(state=>state.form.regPassword)
  const regRole=useSelector(state=>state.form.regRole)
  const location=useSelector(state=>state.form.location)
  const dealerInfo=useSelector(state=>state.form.dealerInfo)
  const userInfo=useSelector(state=>state.form.userInfo)

  const [error, setError] = useState({
    name:"",
    email: '',
    phoneNumber:"",
    password: '',
    selectedRole: 'user',
    location:"",
    dealerInfo:"",
    userInfo:""
  });

  const validateEmail = () => {
    if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(regEmail)){
      console.log("matched")
      setEmailValidation(true)
      
    }
    else{
      setEmailValidation(false)
      setError({
        ...error,
        email:"format of the email input is not correct"
      })
    }}

  const validatePassword=()=>{
    if(/[@#$%^&*()]/.test(regPassword)){
      setPasswordValidation(true)
      
    }
    else{
      setPasswordValidation(false)
      setError({
        ...error,
        password:"password should contain a special character from @, #, $, %, ^, &, *"
      })
    }}

    const validateRole=()=>{

    if(regRole!=="admin" || regRole!=="user"){
      setRoleValidation(true)
      
    }
    else{
      setRoleValidation(false)
      setError({
        ...error,
        selectedRole:"choose a role"
      })
    }

  }

  const validatePhoneNumber=()=>{
    if((phoneNumber.length>10 || phoneNumber.length<10) && /^[0-9]+$/.test(phoneNumber)){
      setPhoneValidation(true)
    }
    else{
      setPhoneValidation(false)
      setError({
        ...error,
        phoneNumber:"phone Number should be total 10 digits"
      })
    }
  }

  const validateLocation=()=>{
    if(location.length!==0){
      setLocationValidation(true)
    }
    else{
      setLocationValidation(false)
      setError({
        ...error,
        location:"also provide your location"
      })
    }
  }

  const validateDealerInfo=()=>{
    const words=dealerInfo.split(/\s+/).length
    if(words>50){
      setDealerInfoValidation(true)
    }
    else{
      setDealerInfoValidation(false)
      setError({
        ...error,
        dealerInfo:"use atleast 50 words about yourself"
      })
    }
  }

  const validateUserInfo=()=>{
    const words=userInfo.split(/\s+/).length
    if(words>50){
      setUserInfoValidation(true)
    }
    else{
      setUserInfoValidation(false)
      setError({
        ...error,
        userInfo:"use atleast 50 words about yourself"
      })
    }
  }


  useEffect(()=>{
    validateEmail()
  },[regEmail])

  useEffect(()=>{
    validatePhoneNumber()
  },[phoneNumber])

  useEffect(()=>{
    validatePassword()
  },[regPassword])

  useEffect(()=>{
    validateRole()
  },[regRole])

  useEffect(()=>{
    validateLocation()
  },[location])

  useEffect(()=>{
    validateDealerInfo()
  },[dealerInfo])

  useEffect(()=>{
    validateUserInfo()
  },[userInfo])

  return (
    <div className='mt-10 max-w-md mx-auto'>
      <h2 className='text-3xl text-orange-500 font-bold font-sans'>Register!</h2>
      <form    className="bg-white text-orange-500 mt-2 space-y-4 max-w-md mx-auto p-4 border border-gray-300 rounded">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label className="block">Role:</label>
          <select
            name="selectedRole"
            value={formData.selectedRole}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div>
          <label className="block">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        <div>
          <label className="block">Dealer Info:</label>
          <input
            type="text"
            name="dealerInfo"
            value={formData.dealerInfo}
            onChange={handleChange}
            className=" text-black w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block">User Info:</label>
          <input
            type="text"
            name="userInfo"
            value={formData.userInfo}
            onChange={handleChange}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">
          Submit
        </button>
      </form>
      </div>
  );
};

export default memo(Register);
