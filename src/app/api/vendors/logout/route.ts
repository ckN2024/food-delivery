import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import Vendor from "@/models/vendor.model";
import connectDB from "@/lib/dbConfig";

connectDB()

export function GET(request: NextRequest) {
    try {
        // check vendor authenticity
        const {id} = getDataFromToken(request)
        const vendor = Vendor.findById(id)

        if(!vendor) {
            return NextResponse.json({
                message: "Vendor trying to log out does not exist"
            })
        }        

        const response = NextResponse.json({
            message: "Vendor logged out successfully."
        }, {status: 200})

        response.cookies.delete("authToken");

        return response;
    } catch (err) {
        console.log("Logout error.")
        return NextResponse.json(err)
    }
}