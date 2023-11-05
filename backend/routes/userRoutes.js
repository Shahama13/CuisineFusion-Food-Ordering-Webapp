import express from "express";
import { addRemoveFromWishlist, deleteUser, forgotPassword, getAllUser, getMyWishlist, getSingleUser, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updateProfile, updateUserRole, updatepassword } from "../controllers/userController.js";
import isAuthenticatedUser, { authorizedRoles } from "../middlewares/auth.js"

const router = express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.get("/me", isAuthenticatedUser, getUserDetails)
router.put("/password/update", isAuthenticatedUser, updatepassword)
router.put("/update/me", isAuthenticatedUser, updateProfile)

router.get("/wishlist",isAuthenticatedUser, getMyWishlist)
router.post("/add-wishlist",isAuthenticatedUser, addRemoveFromWishlist)

router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles, getAllUser)
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizedRoles, getSingleUser)
    .put(isAuthenticatedUser, authorizedRoles, updateUserRole)
    .delete(isAuthenticatedUser, authorizedRoles, deleteUser)

export default router;