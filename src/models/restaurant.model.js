import mongoose from "mongoose";
import Review from "./review.model";

const restaurantAddressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, "street field is required"]
    },

    area: {
        type: String,
        required: [true, "area field is required"]
    },

    city: {
        type: String,
        required: [true, "city field is required"]
    },

    state: {
        type: String,
        required: [true, "state field is required"]
    },

    pincode : {
        type: String,
        required: [true, "Area pin code is required"]
    },

}, {timeStamps: true})

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "restaurant name is required"]
    },

    description: {
        type: String,
        required: [true, "description field is required"]
    },

    addresses: [restaurantAddressSchema],
    
    minimumOrderValue: Number,

    isVeg: Boolean,

    isNonVeg: Boolean,

    isPureVeg: Boolean,

    reviews: [Review],



}, {timestamps: true})

const Restaurant = mongoose.models.restaurants || new mongoose.model('restaurants', restaurantSchema);

export default Restaurant;