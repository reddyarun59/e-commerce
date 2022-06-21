const express=require('express')
const { signup, login, logout, forgotPassword, passwordReset, getLoggedInUserDetails, changePassword } = require('../controllers/userController')
const { protect } = require('../middlewares/auth')

const router=express.Router()

router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/forgotPassword").post(forgotPassword)

router.route("/password/reset/:token").post(passwordReset)

router.route("/userdashboard").get(protect,getLoggedInUserDetails)

router.route("/password/update").post(protect, changePassword)

module.exports=router