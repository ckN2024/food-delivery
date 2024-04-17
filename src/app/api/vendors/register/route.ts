import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConfig";
import Vendor from "@/models/vendor.model";
import bcrypt from "bcrypt";

connectDB()

// register a vendor
export async function POST(request: NextRequest) {
    const requestObj = await request.json()

    let {name, email, password, description, ownerName, mobileNumber, address, isVeg, isNonVeg, isPureVeg} = requestObj

    // check if the email is already registered.
    const vendor = await Vendor.findOne({email: email})

    if(vendor) {
        return NextResponse.json({
            message: "email already in use for a vendor"
        }, {status: 409})
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newVendor = new Vendor({
            name,
            email,
            password: hashedPassword,
            description,
            ownerName,
            mobileNumber,
            address,
            isVeg,
            isNonVeg,
            isPureVeg
        })

        const savedVendor = await newVendor.save()

        // send email for verification
        
        return NextResponse.json(savedVendor, {status: 200})
    } catch (err) {
        console.log("Error occured in saving the vendor")

        return NextResponse.json({
            message: "Failed to create and save the vendor",
            err
        })
    }



    // return NextResponse.json({
    //     message: " response from backend : register vendor",
    //     requestObj
    // })
    
}