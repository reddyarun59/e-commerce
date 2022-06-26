import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { register, reset } from "../features/auth/authSlice"

const Register = () => {

    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        photo:""

    })

    const handleChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    const postDetails=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            photo:e.target.files[0]
        }))
    }

    const {name, email, password, confirmPassword, photo} = formData
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { user, isLoading, isError, isSuccess, message }= useSelector((state)=>state.auth)

    
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        const formDataa=new FormData()
        //formDataa.append(userData)
        formDataa.append("name", formData.name)
        formDataa.append("email", formData.email)
        formDataa.append("password", formData.password)
        formDataa.append("photo",formData.photo )
        
        dispatch(register(formDataa))
    }
    useEffect(()=>{
        if(user||isSuccess){
            navigate("/")
        }
        dispatch(reset())
    },[user, isError, isLoading, isSuccess, message, navigate, dispatch])
    
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for Account</h2>
        </div>
        <form className="mt-8 space-y-6"> 
            <div className="rounded-md shadow-sm -space-y-px">
                <div className="flex">
                    <label htmlFor="name" className="text-xl">
                        Name
                    </label>
                    <input id="name" type="text" name="name" value={name} onChange={handleChange} />
                </div>
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
                <div>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input id="confirmPassword" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="photo">
                        Your Avatar
                    </label>
                    <input id="photo" type="file" name="photo" onChange={postDetails}/>
                </div>
                <button onClick={handleSubmit}>
                    Sign Up
                </button>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Register