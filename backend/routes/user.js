const express=require('express')
const { signup, login, logout, forgotPassword, passwordReset, getLoggedInUserDetails, changePassword, adminAllUsers, managerAllUsers, adminGetSingleUser } = require('../controllers/userController')
const { protect } = require('../middlewares/auth')
const { customRole } = require('../middlewares/customRole')

const router=express.Router()

router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/forgotPassword").post(forgotPassword)

router.route("/password/reset/:token").post(passwordReset)

router.route("/userdashboard").get(protect,getLoggedInUserDetails)

router.route("/password/update").post(protect, changePassword)

//admin only route
router.route("/admin/users").get(protect, customRole("admin"), adminAllUsers)
router.route("/admin/user/:id").get(protect, customRole("admin"), adminGetSingleUser)



//manager only route
router.route("/manager/users").get(protect, customRole("manager"), managerAllUsers)

module.exports=router