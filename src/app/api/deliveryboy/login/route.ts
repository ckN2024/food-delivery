import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConfig";
import DeliveryBoy from "@/models/deliveryBoy.model";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const requestObj = await request.json();
        
        const {email, password} = requestObj;
        
        // check if restaurant exists.
        const deliveryBoy = await DeliveryBoy.findOne({email})
        
        // if deliveryBoy not found
        if(!deliveryBoy) {
            return NextResponse.json({
                message: "Delivery boy not found"
            }, {status: 404})
        }
        
        // check password 
        const isValidPassword = await bcrypt.compare(password, deliveryBoy.password);
        
        // incorrect password
        if(!isValidPassword) {
            return NextResponse.json({
                message: "Password incorrect"
            })
        }
        
        // create token data
        const tokenData = {
            id: deliveryBoy._id,
            name: deliveryBoy.name,
            email: deliveryBoy.email,
            role: "deliveryBoy"
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
          response.cookies.set("authToken", token, { httpOnly: true });
          
          return response
    } catch (error: any) {
        console.log("error in deliveryBoy login");
        return NextResponse.json(error);
    }
}