import getDataFromToken from "@/app/helpers/getDataFromToken";
import FoodItem from "@/models/foodItem.model";
import { NextRequest, NextResponse } from "next/server";
import UserRole from "@/models/Enums/UserRole";
import User from "@/models/user.model";
import FoodReview from "@/models/foodreview.model"

interface urlParamsProps {
    params: {
      foodId: string,
    }
  }

export async function POST(request: NextRequest, {params}: urlParamsProps) {
    try {
        // extract user id from authToken cookie
        const{id: userId, role} = getDataFromToken(request)

        // Only users or primeUser can review a foodItem
        if(role !== UserRole.user && role !== UserRole.primeUser) {
            return NextResponse.json({
                message: "Only users or primeUsers can review a foodItem"
            })
        }

        // check if the user has bought the foodItem
        // implement after place-order route is completed

        // const user = await User.findById(userId)
        // const isBought = user.foodItemsBought.find(())



        const requestObj = await request.json()
        const {rating, comment} = requestObj

        const foodItem = await FoodItem.findById(params.foodId)
        console.log("foodId: ",params.foodId)        
        if(!foodItem) {
            return NextResponse.json({
                message: "Food item with the specified id not found"
            })
        }



        const newReview = new FoodReview({
            rating,
            comment,
            foodId: params.foodId,
            vendorId: foodItem.vendorId,
            userId,
        }) 

        const savedReview = await newReview.save()

        return NextResponse.json({
            message: "Review added successfully",
            dataAdded: savedReview
        })


    } catch (error) {
        console.log("Error in adding food review")
        return NextResponse.json({
            message: "Error in adding food item",
            error
        })
    }
}