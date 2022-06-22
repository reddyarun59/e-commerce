const asyncHandler = require("express-async-handler")
const Product = require("../models/product")
const cloudinary= require("cloudinary")
//const product = require("../models/product")


const addProduct = asyncHandler(async(req, res)=>{
    
    let imageArray=[]

    if(!req.files){
        res.status(401)
        throw new Error("Images are required")
    }

    if(req.files){

        for(let index = 0; index < req.files.photos.length; index++){
            let result = await cloudinary.v2.uploader.upload(
                req.files.photos[index].tempFilePath,
                {
                    folder:"products"
                }
            )
            imageArray.push({
                id:result.public_id,
                secure_url:result.secure_url
            })
        }
    }

    req.body.photos=imageArray
    req.body.user=req.user.id

    const product=await Product.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
})

module.exports={
    addProduct
}