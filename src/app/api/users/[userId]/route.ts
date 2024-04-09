import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/app/dbConfig/dbConfig";

connectDB();

export function GET(request: NextRequest, {params}: any) {
    const {userId} = params;
    console.log(`User id is : ${userId}`);

    
    // find the specific user
    const user = User.findOne(userId);
    console.log(user);
    return NextResponse.json({message: "Get single user"})

    // // if the user is not found
    // if(!user) {
    //     return NextResponse.json({message: "User not found"}, {status: 404});
    // }

    // return NextResponse.json(user);
}