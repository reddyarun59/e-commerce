import {createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const cartItems=JSON.parse(localStorage.getItem('cartItems'))

const initialState ={
    cartItems:cartItems?cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0
}

const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, action){
            const productIndex=state.cartItems.findIndex((product)=>product._id===action.payload._id)

            if(productIndex >= 0){
                state.cartItems[productIndex].cartQuantity +=1
                toast.success(`Increased ${state.cartItems[productIndex].name} Cart Quantity`,
                {
                    position:"top-right"
                })
            }else{
                const tempProduct={...action.payload, cartQuantity:1}
                state.cartItems.push(tempProduct)
                toast.success(`Added ${action.payload.name} to Cart`,
                {
                    position:"top-right"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        }
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer