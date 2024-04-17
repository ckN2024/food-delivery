import connectDB from "@/lib/dbConfig";
import FoodItem from "@/models/foodItem.model";
import Vendor from "@/models/vendor.model"
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectDB()

interface urlParamsProps {
    params: {
      vendorId: string,
    }
  }

// get foodItem of a specific vendor
export async function GET(request: NextRequest, { params }: urlParamsProps) {
    try {
      // error
        // if (!mongoose.models.fooditems) {
        //     mongoose.model('FoodItem', new mongoose.Schema({}));
        //   }

      const vendor = await Vendor.findById(params.vendorId).populate({path: "foodItems", model: FoodItem});
      const foodItems = vendor.foodItems;
  
  
    return NextResponse.json(foodItems)
    } catch (error: any) {
      console.log("Error in getting food item for the specified vendor")
      console.log(error.message)
      return NextResponse.json({
        message: "Error in getting food item for the specified vendor",
        error: error.message
      })
    }
  }