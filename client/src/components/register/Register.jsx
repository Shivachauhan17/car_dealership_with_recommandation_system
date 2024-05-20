// src/FormComponent.js
import React, { useState,memo,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {setName,
  setRegEmail,
  setPhoneNumber,
  setRegPassword,
  setRegRole,
  setLocation,
  setDealerInfo,
  setUserInfo} from '../../store/authForms/loginRegisterReducer'
import {gql, useMutation} from '@apollo/client'
import Swal from 'sweetalert2';


const CREATE_ACCOUNT=gql`
  mutation createPerson($name:String!,$email:String!,$phoneNumber:String!,$password:String!,$selectedRole:String!,$location:String!,$dealerInfo:String!,$userInfo:String!){
    register(name:$name,email:$email,phoneNumber:$phoneNumber,password:$password,selectedRole:$selectedRole,location:$location,dealerInfo:$dealerInfo,userInfo:$userInfo)
  }
`


const Register = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [createPerson]=useMutation(CREATE_ACCOUNT,{
    onError:(error)=>{
      const messages=error.graphQLErrors.map(e=>e.message).join('\n')
      setErrors(messages)
      Swal.fire({
        icon:'error',
        title:'Oops..',
        text:errors
      })
    },
    onCompleted:(data)=>{
      Swal.fire({
        icon:'success',
        title:'Success!',
        text:data.register
      })
      setTimeout(()=>{
        navigate('/login')
      },1500)
      
    }
  })

  const [emailValidation,setEmailValidation]=useState(false)
  const [passwordValidation,setPasswordValidation]=useState(false)
  const [roleValidation,setRoleValidation]=useState(false)
  const [phoneValidation,setPhoneValidation]=useState(false)
  const [locationValidation,setLocationValidation]=useState(false)
  const [dealerInfoValidation,setDealerInfoValidation]=useState(false)
  const [userInfoValidation,setUserInfoValidation]=useState(false)
  const [errors,setErrors]=useState(null)

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

    if(regRole!=="dealership" || regRole!=="user"){
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
    if(phoneNumber?.length===10 && /^[0-9]+$/.test(phoneNumber)){
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

  const handleSubmit=(e)=>{
    e.preventDefault()

    const variables={
      name:name,
      email:regEmail,
      phoneNumber:phoneNumber,
      password:regPassword,
      selectedRole:regRole,
      location:location,
      dealerInfo:dealerInfo,
      userInfo:userInfo
    }

    createPerson({variables:variables})

  }

  return (
    <div className=' mt-10 max-w-[400px] lg:max-w-md mx-auto'>
      <h2 className='text-3xl text-orange-500 font-bold font-sans'>Register!</h2>
      <form  onSubmit={handleSubmit}   className=" max-h-[70vh] overflow-auto bg-white text-orange-500 mt-2 space-y-4 max-w-md mx-auto p-4 border border-gray-300 rounded">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>{dispatch(setName(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={regEmail}
            onChange={(e)=>{dispatch(setRegEmail(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {!emailValidation && <p className="text-red-500">{error.email}</p>}
        </div>

        <div>
          <label className="block">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e)=>{dispatch(setPhoneNumber(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {!phoneValidation && <p className="text-red-500">{error.phoneNumber}</p>}
        </div>

        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={regPassword}
            onChange={(e)=>{dispatch(setRegPassword(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {!passwordValidation && <p className="text-red-500">{error.password}</p>}
        </div>

        <div>
          <label className="block">Role:</label>
          <select
            name="selectedRole"
            value={regRole}
            onChange={(e)=>{dispatch(setRegRole(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          >
            <option value="dealership">Dealership</option>
            <option value="user">User</option>
          </select>
          {!roleValidation && <p className="text-red-500">{error.selectedRole}</p>}

        </div>

        <div>
          <label className="block">Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e)=>{dispatch(setLocation(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {!locationValidation && <p className="text-red-500">{error.location}</p>}
        </div>
        {regRole!=="user"?
        <div>
          <label className="block">Dealer Info:</label>
          <input
            type="text"
            name="dealerInfo"
            value={dealerInfo}
            onChange={(e)=>{dispatch(setDealerInfo(e.target.value))}}
            className=" text-black w-full border border-gray-300 p-2 rounded"
          />
          {!dealerInfoValidation && <p className="text-red-500">{error.dealerInfo}</p>}

        </div>

        :<div>
          <label className="block">User Info:</label>
          <input
            type="text"
            name="userInfo"
            value={userInfo}
            onChange={(e)=>{dispatch(setUserInfo(e.target.value))}}
            className="text-black w-full border border-gray-300 p-2 rounded"
          />
          {!userInfoValidation && <p className="text-red-500">{error.userInfo}</p>}
        </div>}

        {emailValidation && passwordValidation && roleValidation && phoneValidation && locationValidation && (dealerInfoValidation || userInfoValidation)
        ?<button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">
          Submit
        </button>
        :<button type="submit" className="w-full bg-slate-300 text-white p-2 rounded">
        Submit
      </button>
        }
      </form>
      </div>
  );
};

export default memo(Register);
