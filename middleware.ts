import {auth} from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/getCurrentSession";

// export default auth((req) => {
//     const isLoginPage = req.nextUrl.pathname.startsWith('/login')

//     const isAuthUser = req.auth;

//         if(!isAuthUser) {
//             return Response.redirect(new URL('/login', req.url))
//         }
// }) 

export async function middleware(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname.startsWith('/login')
    const session = await getSession()
    if(!session) {
    return Response.redirect(new URL('/login', request.url))
    }
    
  }

 
export const config = {
    matcher: [
        '/',
        '/editor/:path*',
    ]
}