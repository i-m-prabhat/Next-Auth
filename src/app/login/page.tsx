"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage()
{
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>
    {
        try
        {
            setLoading(true);
            const response = await axios.post("api/auth/login", user);
            console.log("Login success", response.data);
            localStorage.setItem("token", response.data.token);

            toast.success("Login Success", response.data);
            setTimeout(() => router.push("/profile"), 2000);

        } catch (error: any)
        {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }
        finally
        {
            setLoading(false);
        }

    }

    useEffect(() =>
    {
        if (user.email.length > 0 && user.password.length > 0)
            setButtonDisabled(false)
        else
            setButtonDisabled(true)
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr />
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
                <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login</button>
                :
                <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none bg-blue-500  focus:border-gray-600">Login</button>

            }
            <p>
                don't have an account?<Link href="/signup"> Visit SignUp Page</Link>
            </p>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}