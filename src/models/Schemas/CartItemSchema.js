import mongoose from "mongoose";

const CartItemSchema = mongoose.Schema({
    foodItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
}, {_id: false})

export default CartItemSchema;