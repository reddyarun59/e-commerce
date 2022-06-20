const User = require("../models/user")
const asyncHandler = require("express-async-handler")

const signup=asyncHandler(async(req, res)=>{
    
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Fill all the fields")
    }

    const userExists=await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }
    
    const user = await User.create({ 
        name,
        email,
        password
    })

    const token=user.getJwtToken()

    const options={
        expires: new Date(Date.now() +30 *24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(user){
        res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    })
}

})



module.exports={
    signup
}