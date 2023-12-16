import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest)
{
    try
    {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        console.log(reqBody);

        //check if user already exists 
        let user = await User.findOne({ email });
        if (user) return NextResponse.json({ error: "User with this email already exist" }, { status: 400 })

        //hash the password before saving it to database
        const hashedPassword = await bcryptjs.hash(password, 12)

        user = new User({ username, email, password: hashedPassword })
        const savedUser = await user.save();

        //send verification email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            status: 201,
            success: true,
            message: 'User created successfully',
            data: savedUser
        });

    } catch (error)
    {
        return NextResponse.json({
            status: "Error",
            message: `${error}`
        }, { status: 500 })
    }
}