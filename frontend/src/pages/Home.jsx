import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { logout, reset } from "../features/auth/authSlice"


const Home = () => {

    const dispatch =useDispatch()
    const { user}=useSelector((state)=>state.auth)
    const [products, setProducts]=useState("")
    
    const fetchProducts = async() =>{

        try {
            
            const {data}= await axios.get("/api/v1/products")
            setProducts(data.products)
            // console.log(products)

        } catch (error) {
            
        }
    }
    useEffect(()=>{
        
        fetchProducts()
        console.log(products)
    },[])

    const handleClick=()=>{
        dispatch(logout())
        dispatch(reset())
    }


  return (
    <div>
        <h1 className="bg-red-600">hello</h1>
        <button onClick={handleClick}>Helloccc {user&&user.user.name}</button>
        {products.map((product=><h1>{product.name}</h1>))}
    </div>
  )
}

export default Home