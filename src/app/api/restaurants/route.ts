import Restaurant from "@/models/restaurant.model";
import { NextResponse } from "next/server";

// get all restaurants
export async function GET() {
    try {
        const restaurants = await Restaurant.find()
        return NextResponse.json(restaurants)
    } catch (error: any) {
        console.log("Error in getting all restaurants")
        return NextResponse.json({
            message: "Error in getting all restaurants",
            error: error.message
        })
    }
}