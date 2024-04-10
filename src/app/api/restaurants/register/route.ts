import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/dbConfig";
import Restaurant from "@/models/restaurant.model";
import bcrypt from "bcrypt";

connectDB()

// register a restaurant
export async function POST(request: NextRequest) {
    const requestObj = await request.json()

    let {name, email, password, description, ownerName, mobileNumber, address, isVeg, isNonVeg, isPureVeg} = requestObj

    // check if the email is already registered.
    const restaurant = await Restaurant.findOne({email: email})

    if(restaurant) {
        return NextResponse.json({
            message: "email already in use for a restaurant"
        }, {status: 409})
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newRestaurant = new Restaurant({
            name,
            email,
            password: hashedPassword,
            description,
            ownerName,
            mobileNumber,
            address,
            isVeg,
            isNonVeg,
            isPureVeg
        })

        const savedRestaurant = await newRestaurant.save()

        // send email for verification
        
        return NextResponse.json(savedRestaurant, {status: 200})
    } catch (err) {
        console.log("Error occured in saving the restaurant")

        return NextResponse.json({
            message: "Failed to create and save the restaurant",
            err
        })
    }



    // return NextResponse.json({
    //     message: " response from backend : register restaurant",
    //     requestObj
    // })
    
}