import mongoose from "mongoose"

// seperate address for delivery: in case an address gets deleted, the address in orders archive will not be affected
const deliveryAddressSchema = new mongoose.Schema({
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
})

const orderSchema = new mongoose.Schema({
    restaurantIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Restaurant",
        required: [true, "restaurantId is required"]
    },

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

    // assignedTo:

    deliveryAddress: {
        type: deliveryAddressSchema,
        required: [true, "Delivery address is required"]
    },

    // paymentMethod: {
    //     type: String,
    //     enum: ['cash', 'card', 'upi'],
    //     required: true
    // }


    estimatedDeliveryTime: {
        type: Date
    },

    actualDeliveryTime: {
        type: Date
    }

}, {timestamps: true})

const Order = mongoose.models.orders || mongoose.model('orders', orderSchema)
export default Order;