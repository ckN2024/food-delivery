import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const requestObj = await request.json();
        
        const {email, password} = requestObj;
        
        // check if vendor exists.
        const vendor = await Vendor.findOne({email})
        
        // if vendor not found
        if(!vendor) {
            return NextResponse.json({
                message: ""
            }, {status: 404})
        }
        
        // check password 
        const isValidPassword = await bcrypt.compare(password, vendor.password);
        
        // incorrect password
        if(!isValidPassword) {
            return NextResponse.json({
                message: "Password incorrect"
            })
        }
        
        // create token data
        const tokenData = {
            id: vendor._id,
            name: vendor.name,
            email: vendor.email,
            role: "vendor"
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
    } catch (err) {
        console.log("error in vendor login");
        return NextResponse.json(err);
    }
}