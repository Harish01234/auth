"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import { AuroraBackground } from '@/components/ui/aurora-background';



export default function LoginPage() {
    const [count, setcount] = useState(0)
    

    
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        setcount(count+1)
        console.log(count)
        }
    }
    const changepassword=async ()=>{
        try {
               const response= await axios.post("/api/users/forgetpassword",user)
               toast.success('password changed');
               console.log("password change success", response.data);
               setcount(prevCount => prevCount + 1);
                console.log(count);
                       
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='text-violet-200 text-2xl '>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email"  className=' text-violet-200'>email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password"  className=' text-violet-200'>password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button id="login button"
            onClick={onLogin}
            className={`${(count>=0 && count<3) || count>3  ? "" :"hidden"}  p-2 border  text-violet-200 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}>{buttonDisabled ? "no login" :"login"}</button>
            <button id="forget button"
            onClick={changepassword}
            className={`${count<=2 || count>3 ? "hidden" :""}  p-2 border  text-violet-200 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}>forgetpassword</button>
            <Link href="/signup"  className=' text-violet-200'>Visit Signup page</Link>
        </div>
        </motion.div>
    </AuroraBackground>
    
    )

}