import express from "express"
const router = express.Router();
import isAuthenticatedUser from "../middlewares/auth.js"
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";

router.route("/payment/process").post(isAuthenticatedUser,processPayment)
router.route("/stripe-api-key").get(isAuthenticatedUser,sendStripeApiKey)

export default router;