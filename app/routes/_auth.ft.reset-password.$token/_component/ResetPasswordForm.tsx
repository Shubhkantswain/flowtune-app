import React from 'react'
import InputField from '~/routes/_auth/Components/InputField'
import { ResetpasswordData } from '~/types'

interface ResetPasswordFormProps {
    actionData?: ResetpasswordData
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ actionData }) => {
    return (
        <>
            <InputField
                id="newPassword"
                name="newPassword"
                type="text"
                label="New password"
                autoComplete="newPassword"
                error={actionData?.errors?.newPassword}
            />

            <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="text"
                label="Confirm password"
                autoComplete="confirmPassword"
                error={actionData?.errors?.confirmPassword}
            />
        </>
    )
}

export default ResetPasswordForm