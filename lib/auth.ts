import { betterAuth } from "better-auth";
 
export const auth = betterAuth({
    //...
    socialProviders: { 
        google: { 
           clientId: process.env.AUTH_GOOGLE_ID as string, 
           clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
        }, 
    }, 

    user: {
        additionalFields: {
            role: {
                type: "string"
              } 
        }
    }

})