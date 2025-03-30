// app/routes/ft.signin.tsx
import { Form, useActionData, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import SigninForm from "./_components/SigninForm";
import GeneralError from "../_auth/Components/GeneralError";
import SubmitButton from "../_auth/Components/SubmitButton";
import { ActionFunctionArgs, json } from "@remix-run/cloudflare";
import { createGraphqlClient } from "~/clients/api";
import { LoginUserMutation } from "~/graphql/mutations/auth";
import { useQueryClient } from "@tanstack/react-query";
import { SigninActionData } from "~/types";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "FlowTune sign in" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const usernameOrEmail = formData.get("usernameOrEmail")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString().trim() ?? "";

    let errors: SigninActionData["errors"] = {};

    if (!usernameOrEmail) errors.usernameOrEmail = "Username Or Email is required.";
    if (!password) errors.password = "password is required.";

    if (Object.keys(errors).length > 0) {
        return json<SigninActionData>({ isLoginSuccess: false, errors }, { status: 400 });
    }

    try {
        const graphqlClient = createGraphqlClient();
        const { loginUser } = await graphqlClient.request(LoginUserMutation, {
            input: { usernameOrEmail, password }
        });

        return json<SigninActionData>({
            isLoginSuccess: true,
            authToken: loginUser?.authToken,
            user: {
                id: loginUser?.id || "",
                email: loginUser?.email || "",
                username: loginUser?.username || "",
                fullName: loginUser?.fullName || "",
                bio: loginUser?.bio || "",
                profileImageURL: loginUser?.profileImageURL || "",
                language: loginUser?.language || "",
                isPro: loginUser?.isPro || false
            },
        },
            {
                status: 200,
                headers: {
                    "Set-Cookie": `__FlowTune_Token_server=${loginUser?.authToken}; Max-Age=86400; HttpOnly; Secure; Path=/; SameSite=None`,
                },
            }
        );

    } catch (error: any) {
        return json<SigninActionData>(
            {
                isLoginSuccess: false,
                errors: {
                    general: error?.response?.errors?.[0]?.message || "Something went wrong"
                }
            },
            { status: 500 }
        );
    }
}

export default function SignIn() {
    const actionData = useActionData<SigninActionData>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const isLoginSuccessful = actionData?.isLoginSuccess;

    const navigate = useNavigate();

    const queryClient = useQueryClient()

    useEffect(() => {
        if (isLoginSuccessful) {
            const handleSetCookie = async () => {
                try {
                    queryClient.setQueryData(['currentUser'], () => {
                        return {
                            id: actionData.user?.id || "",
                            email: actionData.user?.email || "",
                            username: actionData.user?.username || "",
                            fullName: actionData.user?.fullName || "",
                            bio: actionData.user?.bio || "",
                            profileImageURL: actionData.user?.profileImageURL || "",
                            language: actionData.user?.language || "",
                            isPro: actionData.user?.isPro || "",
                        }
                    })

                    if (typeof window !== "undefined") {
                        // This code runs only on the client-side
                        localStorage.setItem("__FlowTune_Token", actionData.authToken || "")
                    }
                    navigate("/", { replace: true });
                } catch (error) {
                    console.error("Failed to set cookie", error);
                }
            };

            handleSetCookie();
        }
    }, [isLoginSuccessful]);

    return (
        <Form method="post" className="space-y-6 w-full max-w-sm">
            {actionData?.errors?.general && (
                <GeneralError error={actionData.errors.general} />
            )}

            <SigninForm actionData={actionData} />

            <SubmitButton isSubmitting={isSubmitting} defaultLabel="Sign in" loadingLabel="Signing in...." />

        </Form>
    );
}
