import React, { useState,memo,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {setLoginEmail,setLoginPassword,setLoginRole} from '../../store/authForms/loginRegisterReducer'
import {gql,useMutation} from '@apollo/client'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const LOGIN=gql`
  mutation Login($email:String!,$password:String!,$selectedRole:String!){
    login(email:$email,password:$password,selectedRole:$selectedRole){
      token
      msg
      type

    }
  }
`


const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [emailValidation,setEmailValidation]=useState(false)
  const [passwordValidation,setPasswordValidation]=useState(false)
  const [roleValidation,setRoleValidation]=useState(false)
  const [errors,setErrors]=useState(null)
  const loginEmail=useSelector(state=>state.form.loginEmail)
  const loginPassword=useSelector(state=>state.form.loginPassword)
  const loginRole=useSelector(state=>state.form.loginRole)
  
  const [error, setError] = useState({
    email: '',
    password: '',
    selectedRole: 'user',
  });

  const [login]=useMutation(LOGIN,{
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
      const result=data.login
      if(result.error){
        Swal.fire({
          icon:'error',
          title:'Oops..',
          text:result.error
        })
      }
      else{
        console.log(result)
        localStorage.setItem('token', result.token)
        localStorage.setItem('userType', result.type)
        Swal.fire({
          icon:'success',
          title:'Success!',
          text:result.msg
        })
        setTimeout(()=>{
          navigate('/home')
        },1500)
      }
    }
  })


  const validateEmail = () => {
    if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginEmail)){
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
    if(/[@#$%^&*()]/.test(loginPassword)){
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

    if(loginRole!=="dealership" || loginRole!=="user"){
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

  useEffect(()=>{
    validateEmail()
  },[loginEmail])

  useEffect(()=>{
    validatePassword()
  },[loginPassword])

  useEffect(()=>{
    validateRole()
  },[loginRole])

  const handleSubmit=(e)=>{
    e.preventDefault()
    const variables={
      email:loginEmail,
      password:loginPassword,
      selectedRole:loginRole
    }
    
    login({variables:variables})

  }

  return (
    <div className='mt-10 max-w-[400px] lg:max-w-md mx-auto'>
      <h2 className='text-3xl text-orange-500 font-bold font-sans'>Login!</h2>
        <form onSubmit={handleSubmit} className="pb-8 bg-white text-orange-500 mt-2 space-y-4 max-w-md mx-auto p-4 border border-gray-300 rounded">
        <div>
            <label>Email:</label>
            <input
            type="text"
            name="email"
            value={loginEmail}
            onChange={(e)=>{dispatch(setLoginEmail(e.target.value))}}
            className="text-black w-full p-2 border border-gray-300 rounded"
            />
            {!emailValidation && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>
        <div>
            <label>Password:</label>
            <input
            type="password"
            name="password"
            value={loginPassword}
            onChange={(e)=>{dispatch(setLoginPassword(e.target.value))}}
            className="text-black w-full p-2 border border-gray-300 rounded"
            />
            {!passwordValidation && <p className="text-red-500 text-sm">{error.password}</p>}
        </div>
        <div>
            <label>Role:</label>
            <select
            name="selectedRole"
            value={loginRole}
            onChange={(e)=>{dispatch(setLoginRole(e.target.value))}}
            className="text-black w-full p-2 border border-gray-300 rounded"
            >
            <option value="dealership">Dealership</option>
            <option value="user">User</option>
            </select>
            {!roleValidation && <p className="text-red-500 text-sm">{error.selectedRole}</p>}
        </div>
        {emailValidation && passwordValidation && roleValidation
          ?<button type="submit" className="w-full bg-sky-400 hover:bg-sky-300 text-white p-2 rounded">Login</button>
          :<button type="submit" className="w-full bg-slate-300  text-white p-2 rounded">Login</button>
        }
        </form>
        </div>
  );
};

export default memo(Login);
