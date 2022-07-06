import axios from "axios"

const fetchProducts=async()=>{
    const response=await axios.get("/api/v1/products")
    return response.data
}

const fetchOneProductDetails=async(productId)=>{
    const response=await axios.get(`/api/v1/product/${productId}`)
    return response.data
}

const productService={
    fetchProducts,
    fetchOneProductDetails
}

export default productService