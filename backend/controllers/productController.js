const asyncHandler = require("express-async-handler")
const Product = require("../models/product")
const cloudinary= require("cloudinary")
const WhereClause = require("../utils/whereClause")
//const product = require("../models/product")


const addProduct = asyncHandler(async(req, res)=>{
    
    // const user=await req.user.id
    // const { name, price, description, category, stock, brand, photos }=await req.body
    let imageArray=[]
    if (typeof (req.body.photos) === "string") {
        await imageArray.push(req.body.photos);
      } else {
        imageArray = await req.body.photos;
      }
    //let photos=req.body.photos
    
    
    // if(req.body.photos){
        const imagesLinks = [];

        if(imageArray.length>=1){

            for(let index = 0; index < imageArray.length ; index++){
             let result = await cloudinary.v2.uploader.upload(imageArray[index],{
                 folder:"products"
             })
             
             imagesLinks.push({
                 id: result.public_id,
                 secure_url: result.secure_url,
               })
            }
        }

        req.body.photos = imagesLinks;
        req.body.user = req.user.id;
        
        // if(!req.body.files.photos){
        //     res.status(401)
        //     throw new Error("Images are required")
        // }
    //  photos=imageArray

    const product=await Product.create(req.body)
    //await product.save()

    res.status(200).json({
        success:true,
        product
    })
})

const getAllProduct= asyncHandler(async(req, res)=>{
    
  const resultPerPage = 15;
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

const addReview= asyncHandler(async(req, res)=>{
    const { rating, comment, productId } = req.body

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const AlreadyReview = product.reviews.find(
        (rev)=>rev.user.toString() === req.user._id.toString()
    )

    if(AlreadyReview){
        product.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString){
                review.comment=comment
                review.rating=rating
            }
        })

    }else{
        product.reviews.push(review)
        product.numberOfReviews= product.reviews.length
    }

    //adjust ratings

    product.ratings= product.reviews.reduce((acc,item)=>item.rating+acc ,0)/product.reviews.length

    //save 

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
})

const getOnlyReviewsForOneProduct= asyncHandler(async(req, res)=>{

    const product= await Product.findById(req.query.id)

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})

const deleteReview= asyncHandler(async(req, res)=>{
    const { productId } = req.query;

    const product = await Product.findById(productId);

    const reviews = product.reviews.filter(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    const numberOfReviews = reviews.length;

    // adjust ratings

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    //update the product

    await Product.findByIdAndUpdate(
        productId,
        {
            reviews,
            ratings,
            numberOfReviews,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
    });

});


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
    addReview,
    getOnlyReviewsForOneProduct,
    deleteReview,
    adminGetAllProduct,
    adminUpdateOneProduct,
    adminDeleteOneProduct,
}

