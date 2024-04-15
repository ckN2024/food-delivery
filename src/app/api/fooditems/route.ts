import FoodItem from "@/models/foodItem.model";
import { NextResponse } from "next/server";

// get all food items
export async function GET() {
    try {
        const foodItems = await FoodItem.find({})
        return NextResponse.json(foodItems);
    } catch (error: any) {
        console.log("Error in getting all food items")
        return NextResponse.json({
            message: "Error in getting all food items",
            error
        })
    }
}