import { Form, useActionData, useLoaderData, useNavigation } from '@remix-run/react'
import React, { useEffect } from 'react'
import GeneralError from '../_auth/Components/GeneralError'
import ResetPasswordForm from './_component/ResetPasswordForm'
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'
import { ResetpasswordData } from '~/types'
import { createGraphqlClient } from '~/clients/api'
import { ResetPasswordMutation } from '~/graphql/mutations/auth'
import SubmitButton from '../_auth/Components/SubmitButton'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
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
      if(token){
          return redirect("/explore")
      }
  
      return token ? true : false

  } catch (error) {
      console.error("Error fetching tracks:", error);
      return []; // Return an empty array to match the expected type
  }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const newPassword = formData.get("newPassword")?.toString().trim() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString().trim() ?? "";

  let errors: ResetpasswordData["errors"] = {};

  if (!newPassword) errors.newPassword = "new password is required.";
  if (!confirmPassword) errors.newPassword = "confirm password is required.";

  if (Object.keys(errors).length > 0) {
    return json<ResetpasswordData>({ isResetPasswordSuccess: false, errors }, { status: 400 });
  }

  if (newPassword != confirmPassword) {
    errors.general = "Password does't match"
    return json<ResetpasswordData>({ isResetPasswordSuccess: false, errors }, { status: 400 });
  }

  try {
    const graphqlClient = createGraphqlClient();
    const { resetPassword } = await graphqlClient.request(ResetPasswordMutation, { input: { newPassword, confirmPassword, token: params.token || "" } });

    return json<ResetpasswordData>({
      isResetPasswordSuccess: true,
    });

  } catch (error: any) {
    return json<ResetpasswordData>(
      {
        isResetPasswordSuccess: false,
        errors: {
          general: error?.response?.errors?.[0]?.message || "Something went wrong"
        }
      },
      { status: 500 }
    );
  }
}

function route() {
  const isAuthenticated = useLoaderData()
  const actionData = useActionData<ResetpasswordData>()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("__FlowTune_Token", "")
    }
  }, [isAuthenticated])

  return (
    <Form method="post" className="space-y-6 w-full max-w-sm">
      {actionData?.errors?.general && (
        <GeneralError error={actionData.errors.general} />
      )}

      {
        actionData?.isResetPasswordSuccess ? (
          <div className="max-w-md mx-auto text-center p-8 rounded-lg shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
            <p className="text-gray-600 mb-6">
              You can now sign in with your new password.
            </p>
            <a
              href="/ft/signin"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Sign In
            </a>
          </div>
        ) : (
          <>
            <ResetPasswordForm actionData={actionData} />
            <SubmitButton
              isSubmitting={isSubmitting}
              defaultLabel="Reset Password"
              loadingLabel="Processing..."
            />
          </>
        )
      }
    </Form >
  )
}

export default route
