import mongoose from "mongoose";
import AddressSchema from "./Schemas/AddressSchema"
import UserRole from "./Enums/UserRole"
import CartItemSchema from "./Schemas/CartItemSchema"


const userSchema = new mongoose.Schema({
    photo: {
        type: String,
        default: "",
    },

    firstName: {
        type: String,
        required: [true, "Firstname field in required"],
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: [true, "email field is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'email field is required'],
    },

    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.user,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    foodItemsBought: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "FoodItem"
    },

    cartItems: [ CartItemSchema ],

    // location

    addresses: [AddressSchema],

    walletAmount: Number,

    coupons: [String],

    verifyToken: String,

    verifyTokenExpiry: Date,

    forgotPasswordToken: String,

    forgotPasswordTokenExpiry: Date,

}, {timestamps: true})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User;



