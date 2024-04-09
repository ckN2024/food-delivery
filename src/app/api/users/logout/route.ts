import { NextResponse } from "next/server";

export function GET() {
    try {
        const response = NextResponse.json({
            message: "User logged out successfully."
        }, {status: 200})

        response.cookies.set("token", "", {httpOnly: true});

        return response
    } catch (err) {
        console.log("Logout errorrr.")
        return NextResponse.json({
            message: "An error occured i loging out."
        })
    }
}