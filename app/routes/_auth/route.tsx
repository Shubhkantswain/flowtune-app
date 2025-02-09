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

    if (token) {
        return redirect("/")
    }

    return json({ message: "Token found", token });
};

 
export default function FtLayout() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("__FlowTune_Token");
            console.log("token", token);
            
            if (token) {
                navigate("/", { replace: true });
            }
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col justify-center items-center">
            <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-xl p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white">
                        Welcome Back To FlowTune
                    </h2>
                </div>

                <div className="mt-6 bg-gray-700 p-6 rounded-lg">
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
