import express from "express"
import isAuthenticatedUser, { authorizedRoles } from "../middlewares/auth.js";
import { deleteOrder, getAllOrders, getSingleOrderDetails, myOrders, newOrder, updateOrder } from "../controllers/orderControllers.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrderDetails)

router.route("/orders").get(isAuthenticatedUser, myOrders)

router.route("/admin/orders").get(isAuthenticatedUser, authorizedRoles, getAllOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizedRoles, updateOrder)
    .delete(isAuthenticatedUser, authorizedRoles, deleteOrder)

export default router