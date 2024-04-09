import mongoose from "mongoose";

const deliverySchema = mongoose.Schema({})

const Delivery = mongoose.models.deliveries || mongoose.model("deliveries", deliverySchema)