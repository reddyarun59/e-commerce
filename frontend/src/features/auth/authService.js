import axios from "axios";

const API_URL1= "/api/v1/signup"
const API_URL2= "/api/v1/login"

//register user 

const register=async(userData)=>{
    const config={
        header:{
            "Content-type":"multipart/form-data"
        }
    }

    const {data}=await axios.post(API_URL1, userData, config)

    if(data){
        localStorage.setItem("user", JSON.stringify(data))
    }

    return data
}


const logout=async()=>{
    localStorage.removeItem("user")
}

const login=async(userData)=>{
    const config={
        header:{
            "Content-type":"application/json"
        }
    }

    const {data}=await axios.post(API_URL2, userData, config)

    if(data){
        localStorage.setItem("user", JSON.stringify(data))
    }

    return data
}

const authService={
    register,
    logout,
    login
}

export default authService