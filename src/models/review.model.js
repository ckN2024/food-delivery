import mongoose from "mongoose";
import Restaurant from "./restaurant.model";


// when user gives restaurant review
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant
    },

    rating: {
        type: Number,
        required: [true, "rating field is required"],
        default: 0,
        min: [0, "minumum rating is 0"],
        max: [5, "maximum rating is 5"],
    },

    comment: {
        type: String,
        required: [true, "comment field is required"],
    },




}, {timestapms: true})

const Review = mongoose.models.reviews || mongoose.model('reviews', reviewSchema);

export default Review;