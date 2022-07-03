import axios from "axios"

const fetchProducts=async()=>{
    const response=await axios.get("/api/v1/products")
    return response.data
}

const productService={
    fetchProducts
}

export default productService