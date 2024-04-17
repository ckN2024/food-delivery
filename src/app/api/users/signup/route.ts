import connectDB from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { sendEmail } from "@/app/helpers/mailer";

// connect to database
connectDB();

export async function POST(request: NextRequest) {
    const requestObj = await request.json();
    
    let {firstName, lastName, email, role, password} = requestObj;

    // trim whitespaces
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();

    // check if required fields are empty
    if(firstName==="" || email==="" || password==="") {
        throw new Error("Firstname, email and password fields cannot be empty.")
    }

    
    // check if the user already exists
    const user = await User.findOne({email: email});

    // if user already exists
    if(user) {
        return NextResponse.json({message: "User already exists"}, {status: 409});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create and save user in DB
    try {
        // create a newUser
        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        //send verification email
        // sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json(savedUser);
    } catch (err) {
        console.log("Failed to create and save user in database!!!");
        console.log(err);
        return NextResponse.json({ message: "Failed to create and save user in database !!!" });
    }

}

