import ErrorHandler from "../utils/errorHandler.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"
import cloudinary from "cloudinary"

// Register a User
export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) return next(new ErrorHandler("User already exists with this email"))
    let newUser = { name, email, password };
    if (req.body.avatar) {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale",
        })
        newUser.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }
    newUser = await User.create(newUser)


    await sendEmail({
        email,
        subject: `Welcome`,
        message: `Heyyy ${name} ! Thanks for Signing Up on Fabizo`
    })

    sendToken(newUser, 201, res)

})

// Login User
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return next(new ErrorHandler("Enter email and password", 400))
    const user = await User.findOne({ email }).select("+password")
    if (!user) return next(new ErrorHandler("User not found", 401))

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 401))

    sendToken(user, 200, res)
})

// Logout user
export const logoutUser = catchAsyncError(async (req, res, next) => {

    res.status(200).cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logged Out successfully"
    })
})

// Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler("User not found", 404))
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

    const message = `Your password reset token is ${resetPasswordUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: `Fabizo password recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }

})

// Password Reset
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
    if (!user) return next(new ErrorHandler("Invalid token", 404))

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user, 200, res)

})

// Get user details
export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

// Update password
export const updatepassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if (!isPasswordMatched) return next(new ErrorHandler("Incorrect Password", 401))

    if (req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHandler("Password doesn't match", 401))

    user.password = req.body.newPassword
    await user.save();

    sendToken(user, 200, res)
})

// Update profile
export const updateProfile = catchAsyncError(async (req, res, next) => {

    const { name, email, avatar } = req.body;

    let newUser = {};
    if (name) {
        newUser.name = name
    }
    if (email) {
        newUser.email = email
    }
    if (avatar) {

        const prevUser = await User.findById(req.user._id)
        if (prevUser.avatar.length > 0) {
            await cloudinary.v2.uploader.destroy(prevUser.avatar.public_id)
        }

        else {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatar",
                width: 150,
                crop: "scale",
            })

            newUser.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

    }

    await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    res.status(200).json({
        success: true,
        message: "Profile updated"
    })
})

// Get users - A
export const getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        users
    })
})

// Get single user details - A
export const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler(`User does not exist with Id ${req.params.id}`, 404))

    res.status(200).json({
        success: true,
        user
    })
})

// Modify user role - A
export const updateUserRole = catchAsyncError(async (req, res, next) => {

    await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, {
        new: true,
        runValidators: true,
        useFindAndmodify: false,
    })
    res.status(200).json({
        success: true,
        message: `User role updated to ${req.body.role}`
    })

})

//Delete a user - A
export const deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))

    // Delete cloudinary for later

    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })

})

// Add/Remove from wishlist
export const addRemoveFromWishlist = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (user.wishlist.includes(req.body.productId)) {
        const index = user.wishlist.indexOf(req.body.productId)
        user.wishlist.splice(index, 1)
        await user.save()
        res.status(200).json({
            success: true,
            message: "Item removed from wishlist"
        })
    }
    else {
        user.wishlist.push(req.body.productId)
        await user.save()
        res.status(200).json({
            success: true,
            message: "Item added to wishlist"
        })
    }
})

// get all wishlist products
export const getMyWishlist = (catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("wishlist")
    res.status(200).json({
        success: true,
        wishlist: user.wishlist
    })
}))