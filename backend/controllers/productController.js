const asyncHandler = require("express-async-handler")
const Product = require("../models/product")
const cloudinary= require("cloudinary")
const WhereClause = require("../utils/whereClause")
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

const getAllProduct= asyncHandler(async(req, res)=>{
    
  const resultPerPage = 6;
  const totalcountProduct = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base;
  const filteredProductNumber = products.length;

  //products.limit().skip()

  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalcountProduct,
  });
})

module.exports={
    addProduct,
    getAllProduct
}