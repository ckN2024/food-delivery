import mongoose from "mongoose";
import AddressSchema from "./Schemas/AddressSchema";
import RestaurantEstablishmentType from "./Enums/RestaurantEstablishmentType"
import WeekDays from "./Enums/Weekdays"

const restaurantSchema = new mongoose.Schema({
    // restaurant name
    name: {
        type: String,
        required: [true, "restaurant name is required"]
    },

    email: {
        type: String,
        required: [true, "restaurnat email is required"],
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
        required: [true, "restaurant owner name is required"]
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
        enum: Object.values(RestaurantEstablishmentType)
    },
    
    openDays: {
        type: [String],
        enum: Object.values(WeekDays)
    },

    // timings: {

    // },

    minimumOrderValue: Number,

    // for reataurants that offer veg food
    isVeg: {
        type: Boolean,
        required: true
    },

    // for restaurant that offers non-veg food
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

    // to be calculated based on user reviews
    rating: {
        type: Number,
        default: 0,
        min: [0, "minimum rating value is 0"],
        max: [5, "maximum rating value is 5"]
    },

    // user reviews of the restaurant
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RestaurantReview"
    },

}, {timestamps: true})

const Restaurant = mongoose.models.restaurants || new mongoose.model('restaurants', restaurantSchema);

export default Restaurant;