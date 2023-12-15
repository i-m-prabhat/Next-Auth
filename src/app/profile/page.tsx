"use client"

import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage()
{
    const router = useRouter();
    const [userData, setUserData] = React.useState('nothing');

    const signOut = () =>
    {
        // localStorage.removeItem("token");
        try
        {
            axios.get("api/auth/logout");
            toast.success("Logout successful");
            setTimeout(() => router.push("/login"), 2000);


        } catch (error: any)
        {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () =>
    {
        const res = await axios.get('/api/auth/me')
        console.log(res.data);
        setUserData(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h1>Profile Page</h1>
            <p>This is a profile page. You can put whatever information you want about yourself here.</p>
            <hr />
            <h2 className="p-1 rounded bg-emerald-500">{userData === 'nothing' ? "Nothing" : <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>

            <button onClick={getUserDetails} className="w-36 h-8 bg-green-500
            text-white font-bold rounded hover:bg-green-700 transition duration-300 ease-in-out">Get Details</button>
            <button onClick={signOut} className="w-36 h-8 bg-red-500
            text-white font-bold rounded hover:bg-red-700 transition duration-300 ease-in-out">Log Out</button>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}