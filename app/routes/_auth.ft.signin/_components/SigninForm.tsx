import React, { useState } from "react";
import InputField from "~/routes/_auth/Components/InputField";
import PasswordField from "~/routes/_auth/Components/PasswordField";
import { SigninActionData } from "~/types";

interface SigninFormProps {
    actionData?: SigninActionData
}

const SigninForm: React.FC<SigninFormProps> = ({ actionData }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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

            <PasswordField
                error={actionData?.errors?.password}
            />
        </>
    );
};

export default SigninForm;