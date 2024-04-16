import connectDB from "@/app/dbConfig/dbConfig"
import getDataFromToken from "@/app/helpers/getDataFromToken"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request:NextRequest) {
    // // fetch the items from the cart
    const {id: userId} = getDataFromToken(request)
    console.log(userId)
    const user = await User.find({_id: userId}, {cartItems: 1, _id: 0})

    return NextResponse.json(user)

    // put the cart items to the orders collection

}