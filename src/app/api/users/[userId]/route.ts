import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/app/dbConfig/dbConfig";

connectDB();

// get user by id
export async function GET(request: NextRequest, {params}: any) {
    const {userId} = params;
    console.log(`User id is : ${userId}`);
    console.log(typeof userId);

    
    // find the specific user
    const user = await User.findOne({_id: userId});
    console.log(user);
    // return NextResponse.json(user)

    // if the user is not found
    if(!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    return NextResponse.json(user);
}