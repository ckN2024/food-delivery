import mongoose from "mongoose";

// when user gives restaurant review
const restaurantReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
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

const RestaurantReview = mongoose.models.restaurantreviews || mongoose.model('restaurantreviews', restaurantReviewSchema);

export default RestaurantReview;