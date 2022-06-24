const mongoose = require('mongoose')

const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[ true, "Please provide product name"],
        trim:true,
        maxLength:[120, "Product name should not be longer than 120 characters"]
    },

    price:{
        type:Number,
        required:[true, "Please provide product price"],
        maxLength:[6, "Product price should not be more than 6 digits"]
    },
    
    description:{
        type:String,
        required:[true, "Please provide product description"]
    },

    photos:[
        {
            id:{
                type:String,
                required:true,
            },
            secure_url:{
                type:String,
                required:true,
            }
        }
    ],

    category:{
        type:String,
        required:[true, "Please select category from- shorts, pants, hoodies, sweatshirts"],
        enum:{
            values:[
                "shorts",
                "pants",
                "hoodies",
                "sweatshirts"
            ],
            message:"Please select category only from- shorts, pants, hoodies, sweatshirts"
        }
    },

    stock:{
        type:Number,
        required:[true, "Please provide product stock"]
    },

    brand:{
        type:String,
        required:[true, "Please provide a brand name for product"]
    },

    ratings:{
        type:Number,
        default:0,
    },

    numberOfReviews:{
        type:Number,
        default:0,
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product=mongoose.model("Product", productSchema)
module.exports= Product