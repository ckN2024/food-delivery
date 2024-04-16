import Vendor from "@/models/vendor.model";
import { NextResponse } from "next/server";

// get all vendors
export async function GET() {
    try {
        const vendors = await Vendor.find()
        return NextResponse.json(vendors)
    } catch (error: any) {
        console.log("Error in getting all vendors")
        return NextResponse.json({
            message: "Error in getting all vendors",
            error: error.message
        })
    }
}