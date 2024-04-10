import Restaurant from "@/models/restaurant.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/app/dbConfig/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const requestObj = await request.json();
        
        const {email, password} = requestObj;
        
        // check if restaurant exists.
        const restaurant = await Restaurant.findOne({email})
        
        // if restaurant not found
        if(!restaurant) {
            return NextResponse.json({
                message: ""
            }, {status: 404})
        }
        
        // check password 
        const isValidPassword = await bcrypt.compare(password, restaurant.password);
        
        // incorrect password
        if(!isValidPassword) {
            return NextResponse.json({
                message: "Password incorrect"
            })
        }
        
        // create token data
        const tokenData = {
            id: restaurant._id,
            name: restaurant.name,
            email: restaurant.email
        }
        
        // create jwt token using the token data
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: "1d",
          });
        
        // create a response
        const response = NextResponse.json(
            {
              message: "Login Successfull",
            },
            { status: 200 }
          );
        
          // set the response cookies.
          response.cookies.set("token", token, { httpOnly: true });
          
          return response
    } catch (err) {
        console.log("error in restaurant login");
        return NextResponse.json(err);
    }
}