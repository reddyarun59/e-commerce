const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const fileUpload= require("express-fileupload")
const cloudinary= require("cloudinary")

const signup=asyncHandler(async(req, res)=>{

    if(!req.files){
        res.status(400)
        throw new Error("Photo is required")
    }

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

    //let result;
    
        let file = req.files.photo

       const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder:"users",
            width:150,
            crop:"scale"
        })
    
    
    
    const user = await User.create({ 
        name,
        email,
        password,
        photo: {
            id: result.public_id,
            secure_url:result.secure_url,
        }
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