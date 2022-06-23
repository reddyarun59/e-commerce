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

const getOneProduct= asyncHandler(async(req, res)=>{
    
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(401)
        throw new Error("No product found with this ID")
    }

    if(product){
        res.status(200).json({
            success: true,
            product,
        })
    }
})

const adminGetAllProduct = asyncHandler(async(req, res)=>{

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products,
    })
})

const adminUpdateOneProduct = asyncHandler(async(req, res)=>{

    let product = await Product.findById(req.params.id)

    let imagesArray=[]

    if(!product){
        res.status(401)
        throw new Error("No product found with this ID")
    }

    if(req.files){

        //destroy the existing Images
        for(let index=0; index<product.photos.length; index++){
          const result = await cloudinary.v2.uploader.destroy(product.photos[index].id)
        }

        //upload and save the images

        for(let index = 0; index < req.files.photos.length; index++){
            let result = await cloudinary.v2.uploader.upload(
                req.files.photos[index].tempFilePath,
                {
                    folder:"products"
                }
            )
            imagesArray.push({
                id:result.public_id,
                secure_url:result.secure_url
            })
        }

    }

    req.body.photos=imagesArray
    
    product= await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true
    })

    res.status(200).json({
        success:true,
        product
    })
})

const adminDeleteOneProduct= asyncHandler(async(req, res)=>{

    const product= await Product.findById(req.params.id)

    if(!product){
        res.status(401)
        throw new Error("No product found with this ID")
    }

    //destroy the existing Images
    for(let index=0; index<product.photos.length; index++){
        const result = await cloudinary.v2.uploader.destroy(product.photos[index].id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message:"Product was successfully deleted"
    })

})

module.exports={
    addProduct,
    getAllProduct,
    getOneProduct,
    adminGetAllProduct,
    adminUpdateOneProduct,
    adminDeleteOneProduct,
}

