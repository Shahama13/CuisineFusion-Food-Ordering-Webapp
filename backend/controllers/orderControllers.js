import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"

// Create new Order
export const newOrder = catchAsyncError(async (req, res, next) => {

    const { shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });
    res.status(200).json({
        success: true,
        order
    })

})

// Get single order details
export const getSingleOrderDetails = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) return next(new ErrorHandler("Order not found with this id", 404))

    res.status(200).json({
        success: true,
        order
    })
})

// Get my orders
export const myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders - A
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update order status - A
export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) return next(new ErrorHandler("Order not found with this id", 404))

    if (order.orderStatus === "Delivered") return next(new ErrorHandler("You have already delivered this product", 404))

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: "Order Updated"
    })
})

// Delete order - A
export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) return next(new ErrorHandler("Order not found with this id", 404))

    await order.deleteOne()

    res.status(200).json({
        success: true,
        message: "Order Deleted"
    })
})