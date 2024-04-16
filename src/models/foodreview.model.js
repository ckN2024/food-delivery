import mongoose from "mongoose";

// when user gives a food review
const foodReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem"
    },

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },

    rating: {
        type: Number,
        required: [true, "rating field is required"],
        default: 0,
        min: [0, "minimum rating is 0"],
        max: [5, "maximum rating is 5"],
    },

    comment: {
        type: String,
        required: [true, "comment field is required"],
    },
}, {timestamps: true})

const FoodReview = mongoose.models.foodreviews || mongoose.model('foodreviews', foodReviewSchema);

export default FoodReview;