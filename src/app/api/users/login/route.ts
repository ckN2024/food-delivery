import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/app/dbConfig/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestObj = await request.json();

    const { email, password } = requestObj;

    // check if the user exists
    const user = await User.findOne({ email });

    console.log(`User is : ${user}`)

    if (!user) {
      console.log("No user found block executed")
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check if the password is valid
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Password incorrect" },
        { status: 401 }
      );
    }

    // create a token data
    const tokenData = {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
    };

    // create a jwt token using the token data
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // create a response
    const response = NextResponse.json(
      {
        message: "Login Successfull",
      },
      { status: 200 }
    );

    // set the response cookies.
    response.cookies.set("token", token, { httpOnly: true });


    return response;
  } catch (err) {
    console.log("A login error")
    console.log(err)
  }
}
