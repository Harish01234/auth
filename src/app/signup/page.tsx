"use client"
import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import axios from 'axios'
import {useRouter} from "next/navigation";
import toast, { Toast } from 'react-hot-toast';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';

function Signuppage() {
  const words = [
    {
      text: "Plz",
      className: "text-violet-200 dark:text-violet-200",
    },
    {
      text: "Signup",
      className: "text-violet-300 dark:text-violet-300",
    },
    {
      text: "And",
      className: "text-violet-400 dark:text-violet-400",
    },
    {
      text: "Enjoy",
      className: "text-violet-500 dark:text-violet-500",
    },
    {
      text: "With Us",
      className: "text-orange-600 dark:text-orange-600",
    },
  ];
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onsignup=async () => {
        try {
            setLoading(true)
            const response=axios.post("/api/users/signup",user)
            console.log("signup success",(await response).data);
            router.push("/login")


        } catch (error:any) {
            console.log("signup failed");
            toast.error(error.message)
        }
        
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    }

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
    
    
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
    <TypewriterEffect words={words} className='m-10' />
         <h1 className='text-violet-200 text-2xl '>{loading ? "Processing" : "Signup"}</h1>
         <hr />
         <label  htmlFor="username"  className=' text-violet-200'>username</label>
         <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         id='username'
         type='text'
         value={user.username}
         placeholder="username"
         onChange={(e)=>setUser({...user,username:e.target.value})}
         />
         <label htmlFor="email" className=' text-violet-200'>email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password" className=' text-violet-200'>password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
             <button
            onClick={onsignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-violet-200">{buttonDisabled ? "No signup" : "Signup"}</button>
              <Link href="/login" className=' text-violet-200'>Visit login page</Link>
              
    </div>
    </motion.div>
    </AuroraBackground>
    
  )
}

export default Signuppage