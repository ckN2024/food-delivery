import Restaurant from "@/models/restaurant.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface urlParamsProps {
    params: {
      foodId: string,
    }
  }

// get foodItem of a specific restaurant
export async function GET(request: NextRequest, { params }: any) {
    try {
        if (!mongoose.models.fooditems) {
            mongoose.model('FoodItem', new mongoose.Schema({}));
          }

      const restaurant = await Restaurant.findById(params.restaurantId).populate("foodItems");
      const foodItems = restaurant.foodItems;
  
  
    return NextResponse.json(foodItems)
    //   return NextResponse.json(foodItems)
    } catch (error: any) {
      console.log("Error in getting food item for the specified restaurant")
      console.log(error.message)
      return NextResponse.json({
        message: "Error in getting food item for the specified restaurant",
        error: error.message
      })
    }
  }