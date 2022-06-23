const asyncHandler = require("express-async-handler");
const Order=require("../models/order")
const Product = require("../models/product")

const createOrder= asyncHandler(async(req, res)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        taxAmount,
        shippingAmount,
        totalAmount,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        taxAmount,
        shippingAmount,
        totalAmount,
        user:req.user._id
    })

    res.status(200).json({
        success: true,
        order,
    })
})

const getOneOrder= asyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id).populate("user", "name email")

    if(!order){
        res.status(401)
        throw new Error("Please check order Id")
    }

    res.status(200).json({
        success: true,
        order
    })
})

const getLoggedInOrders= asyncHandler(async(req, res)=>{
    const order =await Order.find({user:req.user._id})

    if(!order){
        res.status(401)
        throw new Error("No orders placed by you")
    }

    res.status(200).json({
        success: true,
        order
    })
})

const admingetAllOrders = asyncHandler(async(req, res)=>{
    const orders=await Order.find()

    res.status(200).json({
        success: true,
        orders,
    })
})

const adminUpdateOrder = asyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id)

    if(order.orderStatus==="Delivered"){
        res.status(401)
        throw new Error("Order is already marked for delivered")
    }

    order.orderStatus=req.body.orderStatus

    order.orderItems.forEach(async prod=>{
        await updateProductStock(prod.product, prod.quantity)
    })

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})

const adminDeleteOrder= asyncHandler(async(req, res)=>{

    const order= await Order.findById(req.params.id)

    await order.delete()

    res.status(200).json({
        success: true,
    })
})

async function updateProductStock(productId, quantity){
    const product = await Product.findById(productId);
    
    product.stock= product.stock-quantity

    await product.save({validateBeforeSave:false})
}

module.exports={
    createOrder,
    getOneOrder,
    getLoggedInOrders,
    admingetAllOrders,
    adminUpdateOrder,
    adminDeleteOrder,
}