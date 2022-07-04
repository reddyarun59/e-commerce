import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"
import { addToCart, clearCart, decreaseCartItems, getTotals, removeFromCart } from '../features/cart/cartSlice'

const Cart = () => {
  const dispatch=useDispatch()

  const cart=useSelector(state=>state.cart)

  useEffect(()=>{
    dispatch(getTotals())
  },[cart, dispatch])

  const handleRemove=cartItem=>{
    dispatch(removeFromCart(cartItem))
  }

  const handleDecrease=cartItem=>{
    dispatch(decreaseCartItems(cartItem))
  }

  const handleIncrease=cartItem=>{
    dispatch(addToCart(cartItem))
  }

  const handleClear=()=>{
    dispatch(clearCart())
  }

  return (
    <div className="px-2 py-4">
      <h2 className="font-extrabold text-center text-4xl">Shopping Cart</h2>
      {cart.cartItems.length===0?(
        <div className="mt-8">
          <p className="text-xl font-medium">Your cart is currently empty.</p>
          <div className="mt-2">
            <Link to="/">
              <div className="flex justify-center sm:mt-4">
                <span className="mt-1 md:mt-2 mr-2"><BsArrowLeft/></span>
                <span className="text-base sm:text-xl text-slate-500 ">Start Shopping</span>
              </div>
            </Link>
          </div>
        </div>
      ):(
        <div>
          <div className="my-8 md:font-medium md:text-lg grid grid-cols-5 items-center gap-y-0.5">
            <h3 className="col-span-2">PRODUCT</h3>
            <h3>PRICE</h3>
            <h3>QUANTITY</h3>
            <h3>TOTAL</h3>
          </div>
          <div>
            {cart.cartItems?.map(cartItem=>(
              <div key={cartItem._id} className="grid grid-cols-5 items-center gap-y-0.5 border-y-2 border-y-slate-400 py-2">
                <div className="col-span-2 flex justify-around items-center">
                  <img src={cartItem.photos} alt={cartItem.name} className="w-12 md:w-40"/>
                  <div>
                    <h3 className="font-bold text-lg">{cartItem.name}</h3>
                    <button className="btn btn-ghost md:mt-4 text-slate-500" onClick={()=>{handleRemove(cartItem)}}>Remove</button>
                  </div>
                </div>
                <div className="text-lg">
                  {cartItem.price}
                </div>
                <div className="flex justify-center items-center">
                  <button className="rounded-md bg-slate-700 h-8 w-8 hover:bg-slate-300 text-gray-50 hover:text-slate-700 font-bold" onClick={()=>handleDecrease(cartItem)}>-</button>
                  <div className="text-xl mx-1 md:mx-4">{cartItem.cartQuantity}</div>
                  <button className="rounded-md bg-slate-700 h-8 w-8 hover:bg-slate-300 text-gray-50 hover:text-slate-700 font-bold" onClick={()=>handleIncrease(cartItem)}>+</button>
                </div>
                <div className="text-lg tracking-tight md:tracking-wide"> 
                  {cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row md:justify-around mt-4">
            <button className="btn btn-sm md:btn md:btn-warning btn-warning w-1/2 md:w-1/6 flex mx-auto md:m-0" onClick={()=>handleClear()}>Clear Cart</button>
            <div className="mt-4 md:mt-0">
              <div className="flex  justify-center sm:justify-around text-xl font-bold">
                <span>Subtotal</span>
                <span className="pl-4">{cart.cartTotalAmount}</span>
              </div>
              <p className="text-sm text-slate-600 pt-2 md:pt-3">Taxes and Shipping cost are included</p>
              <button className="btn btn-sm md:btn md:btn-success btn-success w-1/2 md:w-full flex mx-auto mb-2 md:mb-4">Check Out</button>
              <div className="flex justify-center">
                <Link to="/">
                  <div className="flex">
                      <BsArrowLeft className="mt-1 mx-2"/>
                    <span className="text-slate-500">
                      Continue Shopping
                    </span>  
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart