import mongoose from "mongoose";
import AddressSchema from "./Schemas/AddressSchema";

const deliveryBoySchema = new mongoose.Schema({
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
        required: [true, "email field is required"],
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    permanentAddresses: AddressSchema,

    presentAddress: AddressSchema,

    aadharNumber: {
        type: Number,
        required: true
    },

    defaultAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },

    incentiveEarned: {
        type: Number
    },

    incentivePaid: {
        type: Number
    },

    incentiveUnpaid: {
        type: Number
    },

    isOnline: {
        type: Boolean
    },

    ordersAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },

    verifyToken: String,

    verifyTokenExpiry: Date,

    forgotPasswordToken: String,

    forgotPasswordTokenExpiry: Date,



}, {timestamps: true})

const DeliveryBoy = mongoose.models.deliveryboys || mongoose.model('deliveryboys', deliveryBoySchema)

export default DeliveryBoy;