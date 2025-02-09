import { ActionFunctionArgs, json } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import React from 'react';
import { createGraphqlClient } from '~/clients/api';
import { sendReqMutation } from '~/graphql/mutations/auth';

export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const graphqlClient = createGraphqlClient();
        const { sendReq } = await graphqlClient.request(sendReqMutation, { text: "hello" });

        console.log("GraphQL Response:", sendReq); // ✅ Debugging log
        return json({ data: sendReq });
    } catch (error) {
        console.error("GraphQL Error:", error);
        return json({ error: "Failed to send request" }, { status: 500 });
    }
};

function SendReq() {
    const actionData = useActionData<typeof action>();

    console.log("Action Data:", actionData); // ✅ Debugging log

    return (
        <div>
            <Form method="post">  {/* ✅ Fix: Add method="post" */}
                <button type="submit">Click me</button>
            </Form>

            {actionData && (
                <p>Server Response: {JSON.stringify(actionData)}</p>
            )}
        </div>
    );
}

export default SendReq;
