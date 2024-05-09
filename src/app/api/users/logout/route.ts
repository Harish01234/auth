import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import {NextRequest,NextResponse} from "next/server"
import jwt from 'jsonwebtoken'

connect()

export async function GET(request:NextRequest) {
    try {
        const response=NextResponse.json({
            message:"logout successfully",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return response
    }catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}