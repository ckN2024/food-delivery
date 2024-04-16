import mongoose from "mongoose";

// when user gives vendor review
const vendorReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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

const VendorReview = mongoose.models.vendorreviews || mongoose.model('vendorreviews', vendorReviewSchema);

export default VendorReview;