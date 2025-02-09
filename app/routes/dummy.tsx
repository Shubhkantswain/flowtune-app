import { json, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import React from 'react'

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
        return json({ token: token })
    }

    return json({ message: "Token found", token });
};


function dummy() {
    const loaderData = useLoaderData()
    console.log("loaderData", loaderData);

    return (
        <div>dummy</div>
    )
}

export default dummy