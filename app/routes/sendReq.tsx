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

        const graphqlClient = createGraphqlClient();
        const { sendReq } = await graphqlClient.request(sendReqMutation, { text: "hello" });
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
