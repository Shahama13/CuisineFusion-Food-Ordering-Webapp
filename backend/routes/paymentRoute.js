import express from "express"
const router = express.Router();
import isAuthenticatedUser from "../middlewares/auth.js"
import { checkout, getKey} from "../controllers/paymentController.js";

router.route("/checkout").post(isAuthenticatedUser,checkout)
router.route("/get-key").get(isAuthenticatedUser,getKey)

export default router;