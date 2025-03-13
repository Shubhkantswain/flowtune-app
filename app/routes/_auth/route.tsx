import { LoaderFunction, redirect } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "~/hooks/auth";

import FooterLinks from "./_components/FooterLinks";
import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import GoogleSignInButton from "./_components/GoogleSigninButton";
import Divider from "./_components/Divider";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    // Get cookies from the request headers
    const cookieHeader = request.headers.get("Cookie");

    // Parse the cookie manually
    const cookies = Object.fromEntries(
        (cookieHeader || "")
            .split("; ")
            .map((c) => c.split("="))
            .map(([key, ...value]) => [key, value.join("=")])
    );

    // Extract the `__FlowTune_Token_server` cookie
    const token = cookies["__FlowTune_Token_server"];

    // if (token) {
    //     return redirect("/")
    // }

    return json({ message: "Token found", token });
};

 
export default function FtLayout() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(typeof window !== "undefined"){
    //         const token = localStorage.getItem("__FlowTune_Token")
    //         if(token){
    //             navigate("/", {replace: true})
    //         }
    //     }
    // }, [])

    return (
        <div className="min-h-screen h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 -mt-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center mt-6">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back To FlowTune</h2>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <GoogleSignInButton />
                    <Divider />
                    <div className="flex flex-col items-center">
                        <Outlet />
                    </div>
                    <FooterLinks />
                </div>
            </div>
        </div>
    );
}
