import connectDB from "@/lib/dbConfig"
import getDataFromToken from "@/app/helpers/getDataFromToken"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import Order from "@/models/order.model"
import FoodItem from "@/models/foodItem.model"
import Vendor from "@/models/vendor.model"
import PaymentMethod from "@/models/Enums/PaymentMethod"

connectDB()

export async function POST(request:NextRequest) {

    try {
        // fetch the items from the cart
        const {id: userId} = getDataFromToken(request)
        console.log(userId)

        const {deliveryAddress: reqDeliveryAddress, paymentMethod, isPaid} = await request.json()

        const user = await User.findById(userId).populate({path:"cartItems.foodItemId", model: FoodItem})

        const orderItems = user.cartItems.map((cartItem: any) => cartItem.foodItemId._id)
        const orderTotal = user.cartItems.reduce((acc: any, cartItem: any)=>(acc + (cartItem.foodItemId.sellingPrice * cartItem.quantity)), 0)
        const deliveryCharges = 10 // calculate after integrating the location api
        // take from the request if passed otherwise take the default address
        const deliveryAddress = reqDeliveryAddress || user.addresses.find((address: any) => (address.isDefault === true))

        // console.log("OrderItems", orderItems)

        const newOrder = new Order({
            userId: user._id,
            orderItems,
            orderTotal,
            deliveryCharges,
            deliveryAddress,
            paymentMethod,
            isPaid

        })

        const savedOrder = await newOrder.save()

        // add the order to each vendor document's ordersRecieved array field. 
        // ******************************This can be done after payment has been made. Decide after payment integration****************************

        // const order = await Order.find({_id: savedOrder._id}, {orderItems: 1, _id: 0}).populate({path:"orderItems", model: FoodItem})

        const order = await Order.findById(savedOrder._id).select("orderItems").populate({path:"orderItems", model: FoodItem})

        for (const orderItem of order.orderItems) {
            const vendorId = orderItem.vendorId;
            
                const vendor = await Vendor.findById(vendorId)
        
                // prevent duplicate entries in vendor's ordersRecieved array field.
                if (!vendor.ordersRecieved.includes(savedOrder._id.toString())) {
                    vendor.ordersRecieved.push(savedOrder._id)
                }
        
                await vendor.save();   
        }

        // remove all the items from the user's cart.
        // ******************************This can be done after payment has been made. Decide after payment integration****************************
            user.cartItems = []
            user.save()

        return NextResponse.json({
            message: "Order placed",
            savedOrder
        })  
    } catch (error) {
        console.log("Error placing order")
        return NextResponse.json({
            message: "Error placing order"
        })
    }
    
}