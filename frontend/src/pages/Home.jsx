import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { logout, reset } from "../features/auth/authSlice"
import { fetchProducts } from '../features/product/productSlice'
import {addToCart, getTotals} from '../features/cart/cartSlice'
import ReactStars from "react-rating-stars-component"
import {Link} from 'react-router-dom'



const Home = () => {

    const dispatch =useDispatch()
    const [loading, setLoading]=useState(false)
    const { user}=useSelector((state)=>state.auth)
    const cart=useSelector((state)=>state.cart)
    //const [products, setProducts]=useState("")
    //const {products}=useSelector((state)=>state.products)
    
    // const fetchProducts = async() =>{

    //     try {
            
    //         const {data}= await axios.get("/api/v1/products")
    //         setProducts(data.products)
    //         // console.log(products)

    //     } catch (error) {
            
    //     }
    // }
    // useEffect(()=>{
        
    //     fetchProducts()
    //     console.log(products)
    // },[dispatch])

    // const handleClick=()=>{
    //     dispatch(logout())
    //     dispatch(reset())
    // }
    const { products, isLoading, isError, isSuccess, message }= useSelector((state)=>state.products)

    useEffect(()=>{
      setLoading(true)
      if(isError) {
        console.log(message)
      }
      dispatch(fetchProducts())
      setLoading(false)
      return ()=>{
        dispatch(reset())
      }
  },[isError,message, dispatch])

    //dispatch(fetchProducts())
    console.log(products)

    const handleAddToCart=product=>{
      dispatch(addToCart(product))
    }

    dispatch(getTotals())


  return (
    <div>
        <h1 className="bg-red-600">hello</h1>
        <button>Helloccc {user&&user.user.name}</button>
        {/* {products.map((product=><h1>{product.name}</h1>))} */}
        
        {loading?(
          <div>Loading...</div>
        ):(
          <div className="flex flex-wrap justify-center">
            {products.products?.map((product)=>(
              
              <div key={product._id} className="mx-4 my-4">
                  <Link to={`/product/${product._id}`}>
                    <div className="card card-compact w-96 bg-base-100 shadow-xl object-cover">
                    <figure><img src={product.photos} alt="Shoes" className="w-48 h-64" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">{product.name}</h2>
                      <p>{product.description}</p>
                      <div>
                        <ReactStars edit={false} activeColor="#ffd700" isHalf={true} value={product.ratings} color="rgba(20,20,20,0.1)"/>
                        <span>({product.numberOfReviews} reviews)</span>
                      </div>
                      <div className="card-actions justify-around">
                        <div>{product.price}</div>
                        <button className="btn btn-primary" onClick={()=>handleAddToCart(product)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
              </Link>
                </div>
            ))}
          </div>
        )}
        
    </div>
  )
}

export default Home