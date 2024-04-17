import connectDB from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import DeliveryBoy from "@/models/deliveryBoy.model"
import bcrypt from "bcrypt";
import { sendEmail } from "@/app/helpers/mailer";

// connect to database
connectDB();

export async function POST(request: NextRequest) {
    const requestObj = await request.json();
    
    let {firstName, lastName, email, password, aadharNumber} = requestObj;

    // trim whitespaces
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    aadharNumber = aadharNumber.trim();

    // check if required fields are empty
    if(firstName==="" || email==="" || password==="" || aadharNumber==="") {
        throw new Error("Firstname, email, password and aadhar number fields cannot be empty.")
    }

    
    // check if the deliveryBoy already exists
    const deliveryBoy = await DeliveryBoy.findOne({email: email});

    // if user deliveryBoy exists
    if(deliveryBoy) {
        return NextResponse.json({message: "User already exists"}, {status: 409});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create and save user in DB
    try {
        // create a newUser
        const newdeliveryBoy = new DeliveryBoy({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            aadharNumber
        })
        const savedDeliveryBoy = await newdeliveryBoy.save();

        //send verification email
        // sendEmail({email, emailType: "VERIFY", userId: savedDeliveryBoy._id})

        return NextResponse.json(savedDeliveryBoy);
    } catch (error: any) {
        console.log("Failed to create and save deliveryBoy in database!!!");
        console.log(error);
        return NextResponse.json({ 
            message: "Failed to create and save deliveryBoy in database !!!",
            error: error.message

        });
    }

}

