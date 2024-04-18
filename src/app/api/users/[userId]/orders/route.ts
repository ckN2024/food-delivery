import getDataFromToken from "@/app/helpers/getDataFromToken"
import UserRole from "@/models/Enums/UserRole"
import Order from "@/models/order.model"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

interface urlParamsProps {
    params: {
      userId: string,
    }
}

export async function GET(request: NextRequest, {params}: urlParamsProps) {
    try {
        const {role} = getDataFromToken(request)

        if(role !== UserRole.user  && role !== UserRole.admin) {
            return NextResponse.json({
                message: "Only admin and users can access this route"
            })
        }

        const user = await User.findById(params.userId) 

        if(!user) {
            return NextResponse.json({
                    message: "Requested user does not exists"
            })
        }

        const orders = await Order.find({userId: user._id})
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