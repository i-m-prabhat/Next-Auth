"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage()
{
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const onSignup = async () =>
    {
        try
        {
            if (loading) return;
            setLoading(true);
            setButtonDisabled(true);
            const response = await axios.post("/api/auth/signup", user)

            console.log("Successfully signed up!");
            toast.success("Successfully signed up! Please log in.");
            setTimeout(() =>
            {
                router.push('/login');
            }, 2000);

        } catch (error)
        {
            console.log("Signup Failed", error);
            toast.error("Signup Failed!");

        } finally
        {
            setLoading(false);
        }

    }

    useEffect(() =>
    {
        if (user.email !== "" && user.password !== "" && user.username !== "")
            setButtonDisabled(false)
        else
            setButtonDisabled(true)
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing......." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />

            {buttonDisabled ?
                <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Sign Up</button>
                :
                <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg bg-blue-500 mb-4 focus:outline-none focus:border-gray-600">Sign Up</button>

            }
            <p>
                already registered?<Link href="/login"> Visit Login Page</Link>
            </p>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}