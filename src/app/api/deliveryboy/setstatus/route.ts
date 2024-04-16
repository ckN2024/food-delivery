import getDataFromToken from "@/app/helpers/getDataFromToken";
import DeliveryBoy from "@/models/deliveryBoy.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestObj = await request.json()
        const {id} = requestObj

        // check authToken and proceed only if the user is logged in
        const tokenData = getDataFromToken(request);
        const { role, id: tokenId } = tokenData;

        // if the id from request is not in
        if(id !== tokenId) {
            return NextResponse.json({
                message: "User is not logged in, please log in to continue"
            })
        }


        // toggle online status
        const user = await DeliveryBoy.findById(id)
        user.isOnline = !user.isOnline
        user.save()

        return NextResponse.json({
            message: `User is now ${user.isOnline? "online":"offline"}` 
        })

    } catch (error: any) {
        console.log("Error in changing online status")
        return NextResponse.json({
            message: "Error in changing online status of delivery boy",
            error: error.message
        })
    }
}