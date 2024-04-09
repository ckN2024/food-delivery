import mongoose from "mongoose";

const Role = {
    user: "user",
    primeUser: "prime user",
    vendor: "vendor",
    admin: "admin",
    delivery: "delivery",
    customerSupport: "customer support"
}

const AddressSchema = new mongoose.Schema({
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

    isDefault: Boolean 

}, {timestamps: true})


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

    addresses: [AddressSchema],

    walletAmount: Number,

    coupons: [String],

    // assignedDeliveries:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Delivery,
    // }],

    verifyToken: String,

    verifyTokenExpiry: Date,

    forgotPasswordToken: String,

    forgotPasswordTokenExpiry: Date,



}, {timestamps: true})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User;



