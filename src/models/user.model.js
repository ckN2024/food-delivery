import mongoose from "mongoose";

const Role = {
    user: "user",
    primeUser: "prime user",
    vendor: "vendor",
    admin: "admin",
    delivery: "delivery",
    customerSupport: "customer support"
}


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
        enum: Object.values(Role),
        default: Role.user,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    // location

    addresses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Address"
    },

    defaultAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },

    walletAmount: Number,

    coupons: [String],

    // assignedDeliveries:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Delivery,
    // }],

    //delivery boy specific start
    incentiveEarned: {
        type: Number
    },
    incentivePaid: {
        type: Number
    },

    isOnline: {
        type: Boolean
    },
    //delivery boy specific end

    verifyToken: String,

    verifyTokenExpiry: Date,

    forgotPasswordToken: String,

    forgotPasswordTokenExpiry: Date,



}, {timestamps: true})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User;



