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
        const {id} = getDataFromToken(request)

        // if (!mongoose.models.fooditems) {
            // console.log("if block")
            // mongoose.model('FoodItem', foodItemSchema);
        // }
    
        const user = await User.findById(id).populate({path: "cartItems.foodItemId", model: FoodItem})
        const cartItems = user.cartItems
    
        return NextResponse.json(cartItems)  
    } catch (error: any) {
        console.log("Error in retrieving cart items")

        return NextResponse.json(error.message)
    }
    
}

// add to cart
export async function POST(request: NextRequest) {
    const {id, role} = getDataFromToken(request)
    const {foodId, quantity} = await request.json()

    // check role: allow only users and adminusers to have cart.
    if(role !== UserRole.user && role !== UserRole.primeUser) {
        return NextResponse.json({
            message: "Only users and primeUsers can have a cart" 
        })
    }

    const user = await User.findById(id)
    const foodItem = await FoodItem.findById(foodId)

    if(!user) {
        return NextResponse.json({
            message: "User details not found in authToken cookie"
        })
    }

    if(!foodItem) {
        return NextResponse.json({
            message: "No food item found for supplied foodId"
        })
    }

    // check if the item already exists in the cart
    const isFoodItemInCart = user.cartItems.find((cartItem:any) => cartItem.foodItemId.toString() === foodId)
    if(isFoodItemInCart) {
        return NextResponse.json({
            message: "Food item already in cart"
        })
    }

    // add item to user document
    user.cartItems.push({
        foodItemId: foodItem._id,
        quantity
    });

    const savedUser = await user.save()


    return NextResponse.json({
        message: "Added to cart",
        updatedUser: savedUser
    })
}

// remove from cart
export async function PATCH() {
    return NextResponse.json({
        message: "Remove from cart"
    })
}