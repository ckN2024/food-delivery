import mongoose from "mongoose";


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

const EstablishmentType = {
    deliveryAndDineIn: "delivery and dine in",
    dineIn: "dine in",
    devliery: "delivery"
}

const OpenDays = {
    monday: "monday",
    tuesday: "tuesday",
    wednesday: "wednesday",
    thursday: "thursday",
    friday: "friday",
    saturday: "saturday",
    sunday: "sunday",
}

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
        type: restaurantAddressSchema,
        required: true,
    },

    establishmentType: {
        type: String,
        enum: Object.values(EstablishmentType)
    },
    
    openDays: {
        type: [String],
        enum: Object.values(OpenDays)
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