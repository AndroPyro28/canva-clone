import { createAuthClient } from "better-auth/react"
const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL
})

export default authClient

export const { signIn, signUp, useSession } = authClient