// get cart items
// add to cart
// remove from cart

import connectDB from "@/lib/dbConfig";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import FoodItem, { foodItemSchema } from "@/models/foodItem.model";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import UserRole from "@/models/Enums/UserRole";

connectDB()

// get cart items by user id
export async function GET(request: NextRequest) {
    try {
        // extract user id
        const {id} = getDataFromToken(request)
    
        const user = await User.findById(id).populate({path: "cartItems.foodItemId", model: FoodItem})
        const cartItems = user.cartItems
    
        return NextResponse.json(cartItems)  
    } catch (error: any) {
        console.log("Error in retrieving cart items")

        return NextResponse.json(error.message)
    }
    
}
