const express=require('express')
const { sendStripeKey, sendRazorpayKey, captureStripePayment, captureRazorpayPayment } = require('../controllers/paymentController')
const { protect } = require('../middlewares/auth')
const { customRole } = require('../middlewares/customRole')

const router=express.Router()

router.route("/stripekey").get(protect,sendStripeKey)
router.route("/razorpaykey").get(protect,sendRazorpayKey)

router.route("/capturestripe").post(protect, captureStripePayment)
router.route("/capturerazorpay").post(protect, captureRazorpayPayment)


module.exports=router