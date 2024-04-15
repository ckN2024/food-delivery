import FoodItem from "@/models/foodItem.model";
import Restaurant from "@/models/restaurant.model";
import { NextRequest, NextResponse } from "next/server";

interface urlParamsProps {
  params: {
    foodId: string,
  }
}


export async function DELETE(request: NextRequest, { params }: urlParamsProps) {
  try {
    // delete the foodItem from fooditems collection
    const foodItem = await FoodItem.findById(params.foodId);

    if (!foodItem) {
      return NextResponse.json({
        message: "Food with given id does not exist",
      });
    }
    await FoodItem.deleteOne({ _id: foodItem._id });

    // delete the foodItem from the restaurant foodItems array
    const restaurant = await Restaurant.findById(foodItem.restaurantId);

    if (!restaurant) {
      console.log("Associated restaurant with the foodItem not found");
    }
    restaurant.foodItems = restaurant.foodItems.filter(
      (id: any) => id.toString() !== foodItem._id.toString()
    );
    await restaurant.save();

    return NextResponse.json({
      message: "Item deleted",
      itemDeleted: foodItem,
    });
  } catch (error) {
    console.log("Error in deleting foodItem")
    return NextResponse.json({
        message: "Error in deleting foodItem"
    })
  }
}

// update a food item using post
export async function PUT(request: NextRequest, {params}: urlParamsProps) {
  try {
    const foodItem = await FoodItem.findById(params.foodId);

    const {name, description, images, category, originalPrice, discountPercent, sellingPrice, availableSizes, ingredients, preparationTime, availability} = await request.json()

    foodItem.name = name
    foodItem.description = description
    foodItem.images = images
    foodItem.category = category
    foodItem.originalPrice = originalPrice
    foodItem.discountPercent = discountPercent
    foodItem.sellingPrice = sellingPrice
    foodItem.availableSizes = availableSizes
    foodItem.ingredients = ingredients
    foodItem.preparationTime = preparationTime
    foodItem.availability = availability

    const updatedFoodItem = await foodItem.save()

    return NextResponse.json({
      message: "Food item updated",
      foodItem: updatedFoodItem
    })
  } catch (error) {
    console.log("Error in updating foodItem");

    return NextResponse.json({
      message: "Error in updating food item",
      error
    })
  }
}

// update a food item using patch
export async function PATCH(request: NextRequest, {params}: urlParamsProps) {
  try {
    const foodItem = await FoodItem.findById(params.foodId);

    const {name, description, images, category, originalPrice, discountPercent, sellingPrice, availableSizes, ingredients, preparationTime, availability} = await request.json();

    if (name) foodItem.name = name;
    if (description) foodItem.description = description;
    if (images) foodItem.images = images;
    if (category) foodItem.category = category;
    if (originalPrice) foodItem.originalPrice = originalPrice;
    if (discountPercent) foodItem.discountPercent = discountPercent;
    if (sellingPrice) foodItem.sellingPrice = sellingPrice;
    if (availableSizes) foodItem.availableSizes = availableSizes;
    if (ingredients) foodItem.ingredients = ingredients;
    if (preparationTime) foodItem.preparationTime = preparationTime;
    if (availability) foodItem.availability = availability;

    const updatedFoodItem = await foodItem.save();

    return NextResponse.json({
      message: "Food item updated",
      foodItem: updatedFoodItem,
    });
  } catch (error) {
    console.log("Error in updating foodItem");

    return NextResponse.json({
      message: "Error in updating food item",
      error,
    });
  }
}
