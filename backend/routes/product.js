const express=require('express')
const { dummy } = require('../controllers/productController')
const { protect } = require('../middlewares/auth')

const router=express.Router()


router.route("/product").get(protect, dummy)
module.exports=router