import getDataFromToken from "@/app/helpers/getDataFromToken"
import UserRole from "@/models/Enums/UserRole"
import FoodItem from "@/models/foodItem.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

// add to cart
export async function PATCH(request: NextRequest) {
    try {
        const {id, role} = getDataFromToken(request)
        const {foodItemId, quantity} = await request.json()

        // check role: allow only users and primeUsers to have cart.
        if(role !== UserRole.user && role !== UserRole.primeUser) {
            return NextResponse.json({
                message: "Only users and primeUsers can have a cart" 
            })
        }

        // find user and foodItem from DB
        const user = await User.findById(id)
        const foodItem = await FoodItem.findById(foodItemId)

        if(!user) {
            return NextResponse.json({
                message: "User details not found in authToken cookie"
            })
        }

        if(!foodItem) {
            return NextResponse.json({
                message: "No food item found for supplied foodItemId"
            })
        }

        // check if the item already exists in the cart
        const isFoodItemInCart = user.cartItems.find((cartItem:any) => cartItem.foodItemId.toString() === foodItemId)
        if(isFoodItemInCart) {
            return NextResponse.json({
                message: "Food item already in cart"
            })
        }

        // update the user document
        user.cartItems.push({
            foodItemId: foodItem._id,
            quantity
        });

        const savedUser = await user.save()


        return NextResponse.json({
            message: "Added to cart",
            updatedUser: savedUser
        })
    } catch (error) {
        console.log("Error in add to cart")
    }
    
}