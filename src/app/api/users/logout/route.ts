import connectDB from "@/lib/dbConfig";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export function GET(request: NextRequest) {
    try {
        // check user authenticity
        const {id} = getDataFromToken(request)
        const user = User.findById(id)

        if(!user) {
            return NextResponse.json({
                message: "User trying to log out does not exist"
            })
        }


        const response = NextResponse.json({
            message: "User logged out successfully."
        }, {status: 200})

        response.cookies.delete("authToken");

        return response
    } catch (err) {
        console.log("Logout error.")
        return NextResponse.json(err)
    }
}