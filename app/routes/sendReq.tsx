import React, { useState } from 'react';
import { createGraphqlClient } from '~/clients/api';
import { sendReqMutation } from '~/graphql/mutations/auth';

function SendReq() {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const graphqlClient = createGraphqlClient();
            const { sendReq } = await graphqlClient.request(sendReqMutation, { text: "hello" });

            console.log("GraphQL Response:", sendReq); // ✅ Debugging log
            setResponseData(sendReq);
        } catch (err) {
            console.error("GraphQL Error:", err);
            setError("Failed to send request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleClick} disabled={loading}>
                {loading ? "Sending..." : "Click me"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {responseData && <p>Server Response: {JSON.stringify(responseData)}</p>}
        </div>
    );
}

export default SendReq;
