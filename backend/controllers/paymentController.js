import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { instance } from "../server.js";

export const checkout = catchAsyncError(async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
    };
    const order = await instance.orders.create(options)
    res.status(200).json({
        success: true,
        order
    })

})

export const getKey = catchAsyncError(async (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
        secret: process.env.RAZORPAY_API_SECRET,
    })
})


