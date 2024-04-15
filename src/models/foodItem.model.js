import mongoose from "mongoose";

const Size = {
    small: "small",
    medium: "medium",
    large: "large",
}

const Category = {
    appetizers: "appetizers",
    mainCourses: "main courses",
    sideDishes: "side dishes",
    desserts: "desserts",
    snacks: "snacks",
    beverages: "beverages",
    breakfastItems: "breakfast items",
    sandwiches: "sandwiches",
    salads: "salads",
    soupsAndStews: "soups and stews",
    pastaAndNoodles: "pasta and noodles",
    riceDishes: "rice dishes",
    pizzas: "pizzas",
    burgersAndSandwiches: "burger and sandwiches",
    seafood: "seafood"
}

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
        enum: Object.values(Category),
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
        enum: Object.values(Size)
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