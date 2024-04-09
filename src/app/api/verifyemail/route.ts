import connectDB from "@/app/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function GET(request: NextRequest) {
    try {        
        const searchParams = request.nextUrl.searchParams
        const token = searchParams.get('token')
    
        // find user by verification token
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
    
        if(!user){
            return NextResponse.json({ message: "Token invalid or expired" }, { status: 400 })
        }
    
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
    
        await user.save();
    
        return NextResponse.json({ message: "User verified successfully" }, {status: 200})
    } catch (err: any) {
        console.log("Verify email try block failed")
        console.log(err.message)
    }
}