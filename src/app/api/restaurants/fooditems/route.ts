import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import { redirect } from "next/navigation";
import FoodItem from "@/models/foodItem.model";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant.model";

export async function POST(request: NextRequest) {
    const tokenData = getDataFromToken(request);
    const { role, id } = tokenData;

    // redirect for unauthorised roles
    if (role === null || role !== 'restaurant') {
        return NextResponse.redirect('/api/restaurants/login');
    }

    const requestObj = await request.json();
    let { name, description, images, category, price, availableSizes, ingredients, preparationTime, availability, rating } = requestObj;
    
    const restaurant = await Restaurant.findById(id)
    
    // create a new foodItem
    const newFoodItem = new FoodItem({
        name,
        description,
        images,
        category,
        price,
        availableSizes,
        ingredients,
        preparationTime,
        availability,
        rating,
        // add the logged-in restaurant id to the food item
        restaurantId: restaurant._id
    });

    const savedFoodItem = await newFoodItem.save();

    // add the food item to the logged-in restaurant
    restaurant.foodItems.push(savedFoodItem._id)
    await restaurant.save()

    return NextResponse.json(savedFoodItem);
}
