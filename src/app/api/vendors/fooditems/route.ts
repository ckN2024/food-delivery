import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import { redirect } from "next/navigation";
import FoodItem from "@/models/foodItem.model";
import Vendor from "@/models/vendor.model";


// upload a food item
export async function POST(request: NextRequest) {
    try { 
        const tokenData = getDataFromToken(request);
        const { role, id } = tokenData;
    
        // redirect for unauthorised roles
        if (role === null || role !== 'vendor') {
            redirect('/api/vendors/login');
        }
    
        const requestObj = await request.json();
        let { name, description, images, category, originalPrice, discountPercent, sellingPrice, availableSizes, ingredients, preparationTime, availability, rating } = requestObj;
        
        const vendor = await Vendor.findById(id)
        
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
            // add the logged-in vendor id to the food item
            vendorId: vendor._id
        });
    
        const savedFoodItem = await newFoodItem.save();
    
        // add the food item to the logged-in vendor
        vendor.foodItems.push(savedFoodItem._id)
        await vendor.save()
    
        return NextResponse.json(savedFoodItem);
    } catch (error) {
        console.log("Error in uploading food item");
        return NextResponse.json({
            message: "Error in uploading food item",
            error
        })
    }

}

