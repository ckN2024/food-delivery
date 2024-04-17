import connectDB from "@/lib/dbConfig";
import getDataFromToken from "@/app/helpers/getDataFromToken";
import DeliveryBoy from "@/models/deliveryBoy.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export function GET(request: NextRequest) {
    try {
        // check deliveryboy authenticity
        const {id} = getDataFromToken(request)
        const deliveryBoy = DeliveryBoy.findById(id)

        if(!deliveryBoy) {
            return NextResponse.json({
                message: "Delivery boy trying to log out does not exist"
            })
        }


        const response = NextResponse.json({
            message: "Delivery boy logged out successfully."
        }, {status: 200})

        response.cookies.delete("authToken");

        return response
    } catch (err) {
        console.log("Logout error.")
        return NextResponse.json(err)
    }
}