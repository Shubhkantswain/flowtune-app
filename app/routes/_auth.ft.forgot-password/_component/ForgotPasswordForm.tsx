import React, { useState } from "react";
import InputField from "~/routes/_auth/Components/InputField";
import { ForgotpasswordData } from "~/types";

interface ForgotPasswordFormProps {
    actionData?: ForgotpasswordData
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ actionData }) => {
    return (
        <>
            <InputField
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                label="Username or Email"
                autoComplete="usernameOrEmail"
                error={actionData?.errors?.usernameOrEmail}
            />
        </>
    );
};

export default ForgotPasswordForm;