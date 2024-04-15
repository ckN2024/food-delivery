import mongoose from "mongoose"

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

    isDefault: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default AddressSchema