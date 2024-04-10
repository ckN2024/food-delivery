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

const fooditemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the food item is required"],
    },

    description: {
        type: String,
        required: [true, "Description of the food item is required"],
    },
    
    images: {
        type: [String],
        required: true
    },

    category: {
        type: String,
        enum: Object.values(Category),
    },

    price: {
        type: Number,
        required: [true, "Price of the food item is required"]
    },

    availableSizes: {
        type: String,
        enum: Object.values(Size),
        default: Size.medium,
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

const Fooditem = mongoose.models.fooditems || mongoose.model("fooditems", fooditemSchema);