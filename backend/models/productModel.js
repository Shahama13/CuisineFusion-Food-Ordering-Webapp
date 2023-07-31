import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        maxLength: [5, "Price cannot exceed 5 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:
        [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
    category: {
        type: String,
        required: [true, "Please enter category"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true })


const Product = mongoose.model("Product", productSchema)

export default Product;