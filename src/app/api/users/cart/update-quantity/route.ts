import getDataFromToken from "@/app/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// update foodItem quantity
export async function PATCH(request: NextRequest) {
    try {
        const {foodItemId, quantity} = await request.json()

        // identify the user
        const {id: userId} = getDataFromToken(request); 

        // find the foodItem in users cart and update quantity
        const user = await User.findById(userId)
        const index = user.cartItems.findIndex((cartItem: any)=> cartItem.foodItemId.toString() === foodItemId)
        user.cartItems[index].quantity = quantity;

        // save the updated user
        const savedUser = await user.save()

        return NextResponse.json({
            message: "Food item quantity updated",
            cartItems: savedUser.cartItems
        })
    } catch (error) {
        console.log("Error in updating the foodItem quantity")   
    }
    
}