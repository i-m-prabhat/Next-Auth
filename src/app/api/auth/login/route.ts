import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest)
{
    try
    {
        const reqBody = await request.json()
        const { email, password } = reqBody;

        console.log(reqBody);

        //check if user exists 
        let user = await User.findOne({ email });
        if (!user) return NextResponse.json({ error: "User not found." }, { status: 400 })

        //check if password is correct 
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) return NextResponse.json({ error: 'Invalid Password.' }, { status: 400 });


        //create token data 
        const tokenData = {
            id: user._id,
            name: user.username,
            email: user.email,
        }

        //create token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Logged in successfully.",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;


    } catch (error)
    {
        return NextResponse.json({
            status: "Error",
            message: `${error}`
        }, { status: 500 })
    }
}