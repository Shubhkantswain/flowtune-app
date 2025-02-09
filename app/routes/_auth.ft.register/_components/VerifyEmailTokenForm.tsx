import React from 'react'
import InputField from '~/routes/_auth/Components/InputField'
import { ActionData } from '~/types'

interface VerifyEmailTokenFormProps {
    actionData?: ActionData
}

const VerifyEmailTokenForm: React.FC<VerifyEmailTokenFormProps> = ({ actionData }) => {
    return (
        <>
            <input type="hidden" name="username" value={actionData?.formData?.username} />
            <input type="hidden" name="fullName" value={actionData?.formData?.fullName} />
            <input type="hidden" name="email" value={actionData?.formData?.email} />
            <input type="hidden" name="password" value={actionData?.formData?.password} />

            <InputField
                id="verificationToken"
                name="verificationToken"
                type="text"
                label="Verification Code"
                placeholder="Enter verification code"
                autoComplete="verificationToken"
                error={actionData?.errors?.verificationToken}
            />
        </>
    )
}

export default VerifyEmailTokenForm