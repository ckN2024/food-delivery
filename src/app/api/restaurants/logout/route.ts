import { NextResponse } from "next/server";


export function GET() {
    try {
        const response = NextResponse.json({
            message: "Restaurant logged out successfully."
        }, {status: 200})

        response.cookies.set("token", "", {httpOnly: true});

        return response;
    } catch (err) {
        console.log("Logout error.")
        return NextResponse.json(err)
    }
}