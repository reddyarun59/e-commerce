const asyncHandler = require("express-async-handler")
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Razorpay=require('razorpay')
//const {nanoid} = require('nanoid')


const sendStripeKey= asyncHandler(async(req, res)=>{
    res.status(200).json({
        stripekey:process.env.STRIPE_API_KEY
    })
})

const captureStripePayment = asyncHandler(async(req, res)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        //optional
        metadata:{ integration_check:"accept_a_payment" }
      });

      res.status(200).json({
        success: true,
        amount: req.body.amount,
        client_secret:paymentIntent.client_secret,
      })
})

const sendRazorpayKey= asyncHandler(async(req, res)=>{
    res.status(200).json({
        razorpaykey:process.env.RAZORPAY_API_KEY
    })
})

const captureRazorpayPayment = asyncHandler(async(req, res)=>{
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET })

    const myOrder = await instance.orders.create({
        amount: req.body.amount,
        currency: "INR",
        // receipt: nanoid(),    
    })

    res.status(200).json({
        success: true,
        amount:req.body.amount,
        order:myOrder
    })
})

module.exports={
    sendStripeKey,
    captureStripePayment,
    sendRazorpayKey,
    captureRazorpayPayment
}