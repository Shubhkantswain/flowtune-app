import { Form, useActionData, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect } from "react";
import { createGraphqlClient } from "~/clients/api";
import { signupUserMutation, verifyEmailMutation } from "~/graphql/mutations/auth";
import SubmitButton from "../_auth/Components/SubmitButton";

import VerifyEmailTokenForm from "./_components/VerifyEmailTokenForm";
import GeneralError from "../_auth/Components/GeneralError";
import RegisterForm from "./_components/RegisterForm";
import { FORM_TYPES } from "~/constants";
import { json, MetaFunction } from "@remix-run/cloudflare";
import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { useQueryClient } from "@tanstack/react-query";
import { RegisterActionData } from "~/types";

export const meta: MetaFunction = () => {
    return [
        { title: "FlowTune register" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formType = formData.get("formType")?.toString();

    // Create GraphQL client with context
    const graphqlClient = createGraphqlClient(); // Make sure to pass context here

    if (formType === "signup") {
        const username = formData.get("username")?.toString().trim() ?? "";
        const fullName = formData.get("fullName")?.toString().trim() ?? "";
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString().trim() ?? "";
        const gender = formData.get("gender")?.toString().trim() ?? "";

        let errors: RegisterActionData["errors"] = {};

        if (!username) errors.username = "Username is required.";
        if (!fullName) errors.fullName = "Full name is required.";
        if (!email) errors.email = "Email is required.";
        if (!password) errors.password = "Password is required.";
        if (!gender) errors.gender = "Please select a gender.";

        if (Object.keys(errors).length > 0) {
            return json<RegisterActionData>({ 
                isSignupSuccess: false, 
                isVerifyEmailSuccess: false, 
                errors 
            }, { status: 400 });
        }

        try {
            const { signupUser } = await graphqlClient.request(signupUserMutation, {
                input: {
                    username,
                    email,
                }
            });

            return json<RegisterActionData>({
                isSignupSuccess: signupUser,
                isVerifyEmailSuccess: false,
                formData: { username, fullName, email, password }
            });

        } catch (error: any) {
            console.error('Signup error:', error); // Add logging
            
            return json<RegisterActionData>(
                {
                    isSignupSuccess: false,
                    isVerifyEmailSuccess: false,
                    errors: {
                        general: error?.response?.errors?.[0]?.message || 
                                "Failed to create account. Please try again."
                    }
                },
                { status: 500 }
            );
        }
    } else {
        // Verification flow
        const verificationToken = formData.get("verificationToken")?.toString().trim() ?? "";
        const username = formData.get("username")?.toString().trim() ?? "";
        const fullName = formData.get("fullName")?.toString() ?? "";
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString().trim() ?? "";

        if (!verificationToken) {
            return json<RegisterActionData>({
                isSignupSuccess: true,
                isVerifyEmailSuccess: false,
                errors: { verificationToken: "Verification Token is required." }
            }, { status: 400 });
        }

        try {
            const { verifyEmail } = await graphqlClient.request(verifyEmailMutation, {
                input: {
                    username,
                    fullName,
                    email,
                    password,
                    token: verificationToken
                }
            });

            if (!verifyEmail?.authToken) {
                throw new Error("No auth token received");
            }

            return json<RegisterActionData>(
                {
                    isSignupSuccess: true,
                    isVerifyEmailSuccess: true,
                    authToken: verifyEmail.authToken,
                    user: {
                        id: verifyEmail?.id || "",
                        email: verifyEmail?.email || "",
                        username: verifyEmail?.username || "",
                        fullName: verifyEmail?.fullName || "",
                        bio: verifyEmail?.bio || "",
                        profileImageURL: verifyEmail?.profileImageURL || ""
                    }
                },
                {
                    status: 200,
                    headers: {
                        "Set-Cookie": `__FlowTune_Token_server=${verifyEmail.authToken}; Max-Age=86400; HttpOnly; Secure; Path=/; SameSite=None`,
                    },
                }
            );
        } catch (error: any) {
            console.error('Verification error:', error); // Add logging
            
            return json<RegisterActionData>(
                {
                    isSignupSuccess: true,
                    isVerifyEmailSuccess: false,
                    errors: {
                        general: error?.response?.errors?.[0]?.message || 
                                "Email verification failed. Please try again."
                    }
                },
                { status: 500 }
            );
        }
    }
};

export default function Register() {
    const actionData = useActionData<RegisterActionData>();
    const routerNavigation = useNavigation();
    const isSubmitting = routerNavigation.state === "submitting";

    const isSignupSuccessful = actionData?.isSignupSuccess;
    const isEmailVerificationSuccessful = actionData?.isVerifyEmailSuccess;

    const navigate = useNavigate();
    const queryClient = useQueryClient()

    useEffect(() => {
        if (isEmailVerificationSuccessful) {
            const handleSetCookie = async () => {
                try {
                    queryClient.setQueryData(['currentUser'], () => {
                        return {
                            id: actionData.user?.id || "",
                            email: actionData.user?.email || "",
                            username: actionData.user?.username || "",
                            fullName: actionData.user?.fullName || "",
                            bio: actionData.user?.bio || "",
                            profileImageURL: actionData.user?.profileImageURL || ""
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
    }, [isEmailVerificationSuccessful]);

    return (
        <Form method="post" className="space-y-6 w-full max-w-sm text-black">
            <input
                type="hidden"
                name="formType"
                value={isSignupSuccessful ? FORM_TYPES.VERIFY : FORM_TYPES.SIGNUP}
            />

            {/* General Error */}
            {actionData?.errors?.general && (
                <GeneralError error={actionData.errors.general} />
            )}

            {!isSignupSuccessful ? (
                <>
                    <RegisterForm actionData={actionData} />
                    <SubmitButton isSubmitting={isSubmitting} defaultLabel="Create an account" loadingLabel="Creating account...." />
                </>
            ) : (
                <>
                    <VerifyEmailTokenForm actionData={actionData} />
                    <SubmitButton isSubmitting={isSubmitting} defaultLabel="Verify email" loadingLabel="Verifying email...." />
                </>
            )}

        </Form>
    );
}
