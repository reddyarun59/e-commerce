const express=require('express')
const { createOrder, getOneOrder, getLoggedInOrders, admingetAllOrders } = require('../controllers/orderController')
const { protect } = require('../middlewares/auth')
const { customRole } = require('../middlewares/customRole')

const router=express.Router()

router.route("/order/create").post(protect,createOrder)
router.route("/order/:id").get(protect,getOneOrder)
router.route("/myorder").get(protect,getLoggedInOrders)

router.route("/admin/orders").get(protect, customRole("admin"), admingetAllOrders)

module.exports= router