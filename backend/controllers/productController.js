import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ApiFeatures from "../utils/apiFeatures.js"

// Create a product - A
export const createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user._id
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

// Get all products
export const getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    //    const productCount= await Product.countDocuments()
    const apiFeat = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage).sort()
    const products = await apiFeat.query
    res.status(200).json({
        success: true,
        productCount: products.length,
        products
    })
})

// Update product - A
export const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 500))

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        successs: true,
        product
    })
}
)

// Delete product - A
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found", 500))

    res.status(200).json({
        successs: true,
        message: "Product deleted successfully"
    })
})

// Get single Product details
export const getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 500))

    res.status(200).json({
        successs: true,
        product
    })
})

// Create/Update review
export const createProductReview = catchAsyncError(async (req, res, next) => {

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment
    }

    const product = await Product.findById(req.body.productId)
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = req.body.rating,
                    rev.comment = req.body.comment
            }
        })

    }
    else {
        product.reviews.unshift(review)
        product.numOfReviews = product.reviews.length
    }
    let sum = 0
    product.reviews.forEach((rev) => {
        sum += rev.rating
    })

    product.ratings = sum / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        successs: true,
        product
    })
})

// Get all reviews of a product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) return next(new ErrorHandler("Product not found", 404))

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})