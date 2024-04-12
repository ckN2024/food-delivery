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

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // check if the password is valid
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
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
    response.cookies.set("authToken", token, { httpOnly: true });


    return response;
  } catch (err) {
    console.log("login error")
    return NextResponse.json(err)
  }
}
