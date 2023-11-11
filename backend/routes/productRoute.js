import express from "express"
import { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, getAllPrdoductsAdmin } from "../controllers/productController.js";
import isAuthenticatedUser, { authorizedRoles } from "../middlewares/auth.js";

const router = express.Router()

router.route("/products").get(getAllProducts)
router.get("/product/:id", getProductDetails)

router.route("/all-products").get(isAuthenticatedUser,authorizedRoles, getAllPrdoductsAdmin)

router.route("/review").post(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews)

router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles, createProduct)
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizedRoles, updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles, deleteProduct)


export default router;