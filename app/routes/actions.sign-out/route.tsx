// app/routes/actions.sign-out.ts
import { json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "~/store/useAuthStore";
import { SignOutActionResponse } from "~/types";

export async function action({ request }: ActionFunctionArgs) {
    return json(
        { success: true },
        {
            headers: {
                "Set-Cookie":
                    "__FlowTune_Token_server=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"
            }
        }
    );
}

function route() {
    const actionData = useActionData<SignOutActionResponse>()
    const queryClient = useQueryClient()

    const { authenticated, setAuthenticated } = useAuthStore()

    useEffect(() => {
        if (actionData?.success) {
            queryClient.setQueryData(['currentUser'], null)
            setAuthenticated(false)
            localStorage.setItem("__FlowTune_Token", "")
        }
    }, [actionData?.success])

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <Form method="post">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Sign Out
                </button>
            </Form>
        </div>
    )
}

export default route