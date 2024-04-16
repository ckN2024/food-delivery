// profile details

import getDataFromToken from "@/app/helpers/getDataFromToken";
import DeliveryBoy from "@/models/deliveryBoy.model";
import { NextRequest, NextResponse } from "next/server";

interface urlParamsProps {
    params: {
      deliveryboyid: string,
    }
  }

export async function GET(request: NextRequest, {params}:urlParamsProps) {
    try {
        const tokenData = getDataFromToken(request);
        const {id} = tokenData

        if(id !== params.deliveryboyid) {
            return NextResponse.json({
                message: "id in params and token does not match"
            })
        }

        const deliveryBoy = await DeliveryBoy.findById(id);

        return NextResponse.json(deliveryBoy);

    } catch (error) {
        console.log("Error in retrieving delivery boy profile")
        return NextResponse.json({
            message: "Error in retrieving delivery boy profile"
        })
    }
}