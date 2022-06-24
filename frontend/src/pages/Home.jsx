import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

    const [products, setProducts]=useState("")
    const fetchProducts = async() =>{

        try {
            
            const {data}= await axios.get("/api/v1/products")
            setProducts(data)

        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchProducts()
        //console.log(products)
    },[])
    console.log(products)

  return (
    <div>
        <h1 className="bg-red-600">hello</h1>
        
    </div>
  )
}

export default Home