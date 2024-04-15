import mongoose from "mongoose";
import FoodCategory from "./Enums/FoodCategory"
import FoodSize from "./Enums/FoodSize"

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the food item is required"],
    },

    description: {
        type: String,
        required: [true, "Description of the food item is required"],
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    
    images: {
        type: [String],
        required: true
    },

    category: {
        type: String,
        enum: Object.values(FoodCategory),
    },

    originalPrice: {
        type: Number,
        required: [true, "Price of the food item is required"]
    },

    discountPercent: {
        type: Number,
        min: [0, "Minimum discount is 0%"],
        max: [100, "Maximum discount is 100%"]
    },

    sellingPrice: {
        type: Number,
        required: [true, "Selling price of the food item is required."]
    },

    availableSizes: {
        type: [String],
        enum: Object.values(FoodSize)
    },

    ingredients: {
        type: [String],
        required: [true, "Ingredient list of the food item is required"]
    },

    preparationTime: {
        type: Number,
        required: [true, "Preparation time of the food item is required"]
    },

    availability: {
        type: Boolean,
        required: [true, "Availability status of the food item is required"]
    },

    rating: Number,

    // reviews:





})

const FoodItem = mongoose.models.fooditems || mongoose.model("fooditems", foodItemSchema);

export default FoodItem