import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import { redirect } from "next/navigation";
import FoodItem from "@/models/foodItem.model";
import Restaurant from "@/models/restaurant.model";


// upload a food item
export async function POST(request: NextRequest) {
    try { 
        const tokenData = getDataFromToken(request);
        const { role, id } = tokenData;
    
        // redirect for unauthorised roles
        if (role === null || role !== 'restaurant') {
            redirect('/api/restaurants/login');
        }
    
        const requestObj = await request.json();
        let { name, description, images, category, originalPrice, discountPercent, sellingPrice, availableSizes, ingredients, preparationTime, availability, rating } = requestObj;
        
        const restaurant = await Restaurant.findById(id)
        
        // Calculate selling price and discount percent in case not provided.
        // calculate the selling price
        sellingPrice = ((100-discountPercent)/100)*originalPrice
    
        // calculate the discount precent
        discountPercent = ((originalPrice - sellingPrice)/originalPrice)*100;
    
        // create a new foodItem
        const newFoodItem = new FoodItem({
            name,
            description,
            images,
            category,
            originalPrice,
            discountPercent,
            sellingPrice,
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
    } catch (error) {
        console.log("Error in uploading food item");
        return NextResponse.json({
            message: "Error in uploading food item",
            error
        })
    }

}

