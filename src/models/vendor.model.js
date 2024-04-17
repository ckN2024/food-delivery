import mongoose from "mongoose";
import AddressSchema from "./Schemas/AddressSchema";
import VendorEstablishmentType from "./Enums/VendorEstablishmentType"
import WeekDays from "./Enums/Weekdays"

const vendorSchema = new mongoose.Schema({
    // vendor name
    name: {
        type: String,
        required: [true, "vendor name is required"]
    },

    email: {
        type: String,
        required: [true, "vendor email is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "password field is required"]
    },

    description: {
        type: String,
        required: [true, "description field is required"]
    },
    
    ownerName: {
        type: String,
        required: [true, "vendor owner name is required"]
    },

    mobileNumber: {
        type: String,
        required: [true, "mobile number is required"]
    },

    address: {
        type: AddressSchema,
        required: true,
    },

    establishmentType: {
        type: String,
        enum: Object.values(VendorEstablishmentType)
    },
    
    openDays: {
        type: [String],
        enum: Object.values(WeekDays)
    },

    // timings: {

    // },

    minimumOrderValue: Number,

    // for vendor that offer veg food
    isVeg: {
        type: Boolean,
        required: true
    },

    // for vendor that offers non-veg food
    isNonVeg: {
        type: Boolean,
        required: true
    },

    // for reataurants that offer only veg food
    isPureVeg: {
        type: Boolean,
        required: true
    },

    foodItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "FoodItem"
    },

    ordersRecieved: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Order"
    },

    // to be calculated based on user reviews
    rating: {
        type: Number,
        default: 0,
        min: [0, "minimum rating value is 0"],
        max: [5, "maximum rating value is 5"]
    },

    // user reviews of the vendor
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VendorReview"
    },

}, {timestamps: true})

const Vendor = mongoose.models.vendors || new mongoose.model('vendors', vendorSchema);

export default Vendor;