import { NextResponse } from "next/server";

export function GET() {
    try {
        const response = NextResponse.json({
            message: "User logged out successfully."
        }, {status: 200})

        response.cookies.delete("authToken");

        return response
    } catch (err) {
        console.log("Logout error.")
        return NextResponse.json(err)
    }
}