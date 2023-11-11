import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ApiFeatures from "../utils/apiFeatures.js"
import cloudinary from "cloudinary"

// Create a product - A
export const createProduct = catchAsyncError(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    const imagesLink = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "avatar",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.user = req.user._id

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

// Get all products - A
export const getAllPrdoductsAdmin = catchAsyncError(async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
})

// Get all products
export const getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 10;
    //    const productCount= await Product.countDocuments()
    const apiFeat = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage).sort()
    const products = await apiFeat.query
    const apiFeat2 = new ApiFeatures(Product.find(), req.query).search().filter().sort()
    const filteredProductCount = await apiFeat2.query
    res.status(200).json({
        success: true,
        resultPerPage,
        // productCount: products.length,
        filteredProductCount: filteredProductCount.length,
        products,
    })
})

// Update product - A
export const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 500))

    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if(images!==undefined){
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        
        const imagesLink = []
        
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "avatar",
            });
            
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLink
    }

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

    for(let i=0;i<product.images.length;i++){
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

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
        avatar: req.user.avatar.url,
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