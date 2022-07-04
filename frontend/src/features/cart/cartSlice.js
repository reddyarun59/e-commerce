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
        },

        removeFromCart(state, action){
            const nextCartItems=state.cartItems.filter((cartItem) =>(
                cartItem._id !== action.payload._id
            ))
            
            state.cartItems=nextCartItems;

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            toast.error(`${action.payload.name} Removed from Cart`,
                {
                    position:"top-right"
                })
        },

        decreaseCartItems(state, action){
            const productIndex=state.cartItems.findIndex((product)=>product._id===action.payload._id)

            if(state.cartItems[productIndex].cartQuantity>1){
                state.cartItems[productIndex].cartQuantity-=1

                toast.success(`Decreased ${state.cartItems[productIndex].name} Cart Quantity`,
                {
                    position:"top-right"
                })
            }else if(state.cartItems[productIndex].cartQuantity===1){
                const nextCartItems=state.cartItems.filter((cartItem) =>(
                    cartItem._id !== action.payload._id
                    
                ))
                
                state.cartItems=nextCartItems;
                toast.error(`${action.payload.name} Removed from Cart`,
                {
                    position:"top-right"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        clearCart(state, action) {
            state.cartItems=[]
            toast.error(`Cart cleared`,
                {
                    position:"top-right"
                })
            localStorage.removeItem("cartItems", JSON.stringify(state.cartItems))
        },

        getTotals(state, action){
            const cartResult=state.cartItems.reduce((cartTotal, cartItem) => {
                const { cartQuantity, price}=cartItem
                const itemTotal=cartQuantity * price

                cartTotal.total += itemTotal
                cartTotal.quantity +=cartQuantity

                return cartTotal
            },{
                total:0,
                quantity:0
            })
            const {total, quantity}=cartResult
            state.cartTotalQuantity=quantity
            state.cartTotalAmount=total
        }
    }
})

export const { addToCart, removeFromCart, decreaseCartItems, clearCart, getTotals } = cartSlice.actions

export default cartSlice.reducer