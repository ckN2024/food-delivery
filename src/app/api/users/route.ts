import User from "@/models/user.model";
import { NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/dbConfig";

connectDB();

// get all users
export async function GET() {
    const users = await User.find({});
    return NextResponse.json(users);
}

