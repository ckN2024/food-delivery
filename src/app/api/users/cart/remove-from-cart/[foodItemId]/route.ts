import getDataFromToken from "@/app/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

interface urlParamsProps {
    params: {
      foodItemId: string,
    }
}

// delete cart item
export async function PATCH(request: NextRequest, {params}: urlParamsProps) {
    // get user from token
    const {id: userId} = getDataFromToken(request)

    // extract foodItemId from params
    const foodItemId = params.foodItemId

    // find the user and update the cart 
    const user = await User.findById(userId)
    const index = user.cartItems.findIndex((cartItem: any)=> cartItem.foodItemId.toString() === foodItemId)
    
    if(index<0) {
        return NextResponse.json({
            message: "Item not found in cart"
        })
    }
    
    user.cartItems.splice(index, 1)

    await user.save()

    return NextResponse.json({
        message: "item deleted successfully"
    })
    
}