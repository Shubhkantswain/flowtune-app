// app/routes/actions.sign-out.ts
import { json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export async function action({ request }: ActionFunctionArgs) {
  return json(
    { success: true } ,
    {
      headers: {
        "Set-Cookie":
          "__FlowTune_Token_server=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"
      }
    }
  );
}