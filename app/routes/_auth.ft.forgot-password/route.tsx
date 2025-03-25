import { ActionFunctionArgs, json } from '@remix-run/cloudflare';
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { createGraphqlClient } from '~/clients/api';
import { ForgotPasswordMutation } from '~/graphql/mutations/auth';
import { ForgotpasswordData } from '~/types';
import SubmitButton from '../_auth/Components/SubmitButton';
import GeneralError from '../_auth/Components/GeneralError';
import ForgotPasswordForm from './_component/ForgotPasswordForm';


export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const usernameOrEmail = formData.get("usernameOrEmail")?.toString().trim() ?? "";

  let errors: ForgotpasswordData["errors"] = {};

  if (!usernameOrEmail) errors.usernameOrEmail = "Username Or Email is required.";

  if (Object.keys(errors).length > 0) {
    return json<ForgotpasswordData>({ isForgotPasswordSuccess: false, errors }, { status: 400 });
  }

  try {
    const graphqlClient = createGraphqlClient();
    const { forgotPassword } = await graphqlClient.request(ForgotPasswordMutation, { usernameOrEmail });

    return json<ForgotpasswordData>({
      isForgotPasswordSuccess: true,
    });

  } catch (error: any) {
    return json<ForgotpasswordData>(
      {
        isForgotPasswordSuccess: false,
        errors: {
          general: error?.response?.errors?.[0]?.message || "Something went wrong"
        }
      },
      { status: 500 }
    );
  }
}

function route() {
  const actionData = useActionData<ForgotpasswordData>()
  const routerNavigation = useNavigation();
  const isSubmitting = routerNavigation.state === "submitting";

  return (
    <Form method="post" className="space-y-6 w-full max-w-sm">
      {actionData?.errors?.general && (
        <GeneralError error={actionData.errors.general} />
      )}

      {
        actionData?.isForgotPasswordSuccess ? (
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
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
            <h2 className="text-2xl font-bold text-gray-900">Reset Link Sent!</h2>
            <p className="text-gray-600">
              We've sent a password reset link to your email address.
            </p>
            <div className="rounded-md bg-blue-50 p-4 text-left">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Didn't receive it?</span> Check your spam folder
                or try resending in 2 minutes.
              </p>
            </div>
          </div>
        ) : (
          <>
            <ForgotPasswordForm actionData={actionData} />
            <SubmitButton
              isSubmitting={isSubmitting}
              defaultLabel="Send Reset Link"
              loadingLabel="Sending..."
            />
          </>
        )
      }
    </Form >
  )
}

export default route