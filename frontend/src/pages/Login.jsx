//import { reset } from 'nodemon'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'


const Login = () => {

  const [formData, setFormData] =useState({
    email:"",
    password:""
  })

  const { email, password}=formData

  const handleChange=(e)=>{
    setFormData(prevState=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const navigate=useNavigate()
    const dispatch=useDispatch()
    const { user, isLoading, isError, isSuccess, message }= useSelector((state)=>state.auth)

  const handleSubmit=(e)=>{
    e.preventDefault()

    dispatch(login(formData))
  }
  useEffect(()=>{
    if(user||isSuccess){
        navigate("/")
    }
    dispatch(reset())
},[user, isError, isLoading, isSuccess, message, dispatch,navigate])

if(isLoading){
  return(
      <div>Loading.....</div>
  )
}

  return (
    <>
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Signin to your account</h2>
        </div>
        <form className="mt-8 space-y-6"> 
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input id="email" type="email" name="email" value={email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input id="password" type="password" name='password' value={password} onChange={handleChange}/>
                </div>
                
                <button onClick={handleSubmit}>
                    Sign In
                </button>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Login