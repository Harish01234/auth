import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import {NextRequest,NextResponse} from "next/server"
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest) {
    try {
       const user=await getDataFromToken(request)
       const userId=await User.findOne({_id:user.userid}).select("-password")
       if(userId) {
        console.log(userId);
    } else {
        console.log("User not found");
    }
       //cheek if there is no user
       
        return NextResponse.json(
            {
                message:"user found",
                data:userId
            }
        )

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }


}