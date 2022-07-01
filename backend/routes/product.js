const express=require('express')
const { getAllProduct, getOneProduct, addReview, deleteReview, getOnlyReviewsForOneProduct, addProduct, adminGetAllProduct, adminUpdateOneProduct, adminDeleteOneProduct } = require('../controllers/productController')
const { protect } = require('../middlewares/auth');
const { customRole } = require('../middlewares/customRole');

const router=express.Router()


//router.route("/product").get(protect, dummy)

router.route("/products").get(getAllProduct);
router.route("/product/:id").get(getOneProduct);
router.route("/review").put(protect, addReview);
router.route("/review").delete(protect, deleteReview);
router.route("/reviews").get(protect, getOnlyReviewsForOneProduct);

//admin routes
router.route("/admin/product/add").post(protect, customRole("admin"), addProduct);

router
  .route("/admin/products")
  .get(protect, customRole("admin"), adminGetAllProduct);

router
  .route("/admin/product/:id")
  .put(protect, customRole("admin"), adminUpdateOneProduct)
  .delete(protect, customRole("admin"), adminDeleteOneProduct);


module.exports=router