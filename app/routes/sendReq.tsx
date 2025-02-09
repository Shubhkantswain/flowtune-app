import { ActionFunctionArgs, json } from '@remix-run/cloudflare'
import { Form, useActionData } from '@remix-run/react'
import React from 'react'
import { createGraphqlClient } from '~/clients/api'
import { sendReqMutation } from '~/graphql/mutations/auth'

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const graphqlClient= createGraphqlClient()
    const {sendReq} = await graphqlClient.request(sendReqMutation, {text: "hello"})
    return json({data: sendReq})
}

function sendReq() {
const actionData = useActionData()
console.log(actionData, "actiondsta");

  return (
    <Form>
        <button type='submit'>
            click me
        </button>
    </Form>
  )
}

export default sendReq