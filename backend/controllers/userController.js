const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const fileUpload= require("express-fileupload")
const cloudinary= require("cloudinary")
const mailHelper = require("../utils/emailHelper")
const crypto = require("crypto")

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
            token,
            user
        })
    }

})

const login=asyncHandler(async(req, res)=>{

    const { email, password }=req.body


    //check for presence of email and password
    if(!email || !password){
        res.status(400)
        throw new Error("Please provide email and password")
    }

    //get user from DB
    const user=await User.findOne({ email }).select("+password")


    //if user is not found in DB
    if(!user){
        res.status(400)
        throw new Error("Email or password does not match or exist")
    }


    //match the password
    const isPasswordCorrect = await user.isValidatedPassword(password)


    //if password is  do not match
    if(!isPasswordCorrect){
        res.status(400)
        throw new Error("Email or password does not match or exist")
    }


    const token=user.getJwtToken()

    const options={
        expires: new Date(Date.now() +30 *24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(user && isPasswordCorrect){
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })
    }

})

const logout= asyncHandler(async(req, res)=>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "User logged out"
    })
})

const forgotPassword= asyncHandler(async(req, res)=>{

    const { email } = req.body

    const user = await User.findOne({ email })

    if(!user){
        res.status(400)
        throw new Error("Email doesn't exist")
    }

    //get token from user model methods
    const forgotToken=user.getForgotPasswordToken()

    //save user fields in DB
    await user.save({validateBeforeSave:false})

    //create a url
    const myUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${forgotToken}`

    //craft a message
    const message= `Copy paste this link in your URL and hit enter \n\n${myUrl}`

    //attempt to send email
    try {
        
        await mailHelper({
            email: user.email,
            subject: "ECOMM - Password reset email",
            message
        })

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })

    } catch (error) {
        
        user.forgotPasswordToken=undefined
        user.forgotPasswordExpiry=undefined
        await user.save({validateBeforeSave:false})

        res.status(500)
        res.send(error.message)
    }
})

const passwordReset = asyncHandler(async(req, res)=>{

    let token= req.params.token
    
    const encryToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const user = await User.findOne({ 
        encryToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if(!user){
        res.status(400)
        throw new Error("Token is invalid or expired")
    }

    if( req.body.password !== req.body.confirmPassword ){
        res.status(400)
        throw new Error("Password and Confirm Password do not match")
    }

    user.password = req.body.password

    user.forgotPasswordExpiry=undefined
    user.forgotPasswordToken=undefined

    await user.save()

    //send a JSON response or token

    token=user.getJwtToken()

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

const getLoggedInUserDetails= asyncHandler(async(req, res)=>{
    
    const user = await User.findById(req.user.id)

    if(user){
        res.status(200).json({
            success: true,
            user
        })
    }
})

const changePassword = asyncHandler(async(req, res)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isCorrectOldPassword = await user.isValidatedPassword(req.body.oldPassword)

    if(!isCorrectOldPassword){
        res.status(400)
        throw new Error("Old Password is incorrect")
    }

    user.password=req.body.password

    await user.save()

    const token=user.getJwtToken()

    const options={
        expires: new Date(Date.now() +30 *24 * 60 * 60 * 1000),
        httpOnly: true
    }

        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })

})

// const updateUserDetails=asyncHandler(async(req, res)=>{

//     const newData={
//         name: req.body.name,
//         email: req.body.email,

//     }

//     const user = await User.findByIdAndUpdate(req.user.id, newData, {
//         new:true,
//         runValidators: true,
//     })

//     res.status(200).json({
//         success: true,
//         user
//     })
// })


const adminAllUsers=asyncHandler(async(req, res)=>{

    const users = await User.find()

    res.status(200).json({
        success: true,
        users,
    })
})

const managerAllUsers=asyncHandler(async(req, res)=>{

    const users = await User.find({role:"user"})

    res.status(200).json({
        success: true,
        users,
    })
})

module.exports={
    signup,
    login,
    logout,
    forgotPassword,
    passwordReset,
    getLoggedInUserDetails,
    changePassword,
    adminAllUsers,
    managerAllUsers
}