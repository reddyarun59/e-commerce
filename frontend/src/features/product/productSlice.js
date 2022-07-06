import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService'

const initialState= {
    products: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const fetchProducts =createAsyncThunk("products/fetchProducts", async(_,thunkAPI)=>{
    try {
        return await productService.fetchProducts()
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchOneProductDetails = createAsyncThunk("products/fetchOneProductDetails", async(id, thunkAPI) => {
    try {
        return await productService.fetchOneProductDetails(id)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
            state.message=""
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.isLoading=true;
            })
            .addCase(fetchProducts.fulfilled, (state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.products=action.payload
            })
            .addCase(fetchProducts.rejected, (state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.payload;
                state.products=null
            })
            .addCase(fetchOneProductDetails.pending, (state)=>{
                state.isLoading=true;
            })
            .addCase(fetchOneProductDetails.fulfilled, (state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.products=action.payload
            })
            .addCase(fetchOneProductDetails.rejected, (state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.payload;
                state.products=null
            })
    }
})
export const {reset}=productSlice.actions
export default productSlice.reducer