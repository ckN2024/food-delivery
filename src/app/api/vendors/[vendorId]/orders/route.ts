import getDataFromToken from "@/app/helpers/getDataFromToken";
import connectDB from "@/lib/dbConfig";
import UserRole from "@/models/Enums/UserRole";
import Order from "@/models/order.model";
import Vendor from "@/models/vendor.model";
import { NextRequest, NextResponse } from "next/server";

interface urlParamsProps {
    params: {
      vendorId: string,
    }
}

connectDB()

export async function GET(request: NextRequest, {params}: urlParamsProps) {
    try {
        const {role} = getDataFromToken(request)

        if(role !== "vendor" && role !== UserRole.admin) {
            return NextResponse.json({
                message: "Only admin and vendor can access this route"
            })
        }

        const vendor = await Vendor.findById(params.vendorId).populate({path: "ordersRecieved", model: Order})

        if(!vendor) {
            return NextResponse.json({
                    message: "Requested vendor does not exists"
            })
        }

        const orders = vendor.ordersRecieved
        return NextResponse.json({
            message: "Message from vendor get all orders",
            orders
        })


    } catch (error: any) {
        console.log("Error retrieving orders")
        return NextResponse.json({
            error: error.message
        })
    }
    
}