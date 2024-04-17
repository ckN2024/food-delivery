import mongoose from "mongoose"
import AddressSchema from "./Schemas/AddressSchema"
import OrderStatus from "./Enums/OrderStatus"
import PaymentMethod from "./Enums/PaymentMethod"

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userId is required"]
    },

    orderItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "FoodItem",
        required: [true, "fooditems is required"]
    },

    orderTotal: {
        type: Number,
        required: [true, "order total is required"]
    },

    deliveryCharges: {
        type: Number,
        required: [true, "delivery charges is required"]
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryBoy"
    },

    deliveryAddress: {
        type: AddressSchema,
        required: [true, "Delivery address is required"]
    },

    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethod),
        required: true
    },

    isPaid: {
        type: Boolean,
        required: true
    }, 

    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.pending
    },

    estimatedDeliveryTime: {
        type: Date
    },

    actualDeliveryTime: {
        type: Date
    }

}, {timestamps: true})

const Order = mongoose.models.orders || mongoose.model('orders', orderSchema)
export default Order;