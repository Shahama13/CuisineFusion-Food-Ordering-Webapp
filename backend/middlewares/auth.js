import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import User from "../models/userModel.js";

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Please login to access", 401))

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedUser.id)

    next();
})

export const authorizedRoles = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403))
    }
    next();
})

export default isAuthenticatedUser;