import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        console.log(reqBody)
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "user not exits" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        user.password=hashedPassword
        const saveduser=await user.save()
        //send verifiaction mail

        await sendEmail({email,emailType:"RESET",userId:saveduser._id})

        return NextResponse.json({
            message:"password changed succesfully",
            success:"true"
           },{status:200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }



}