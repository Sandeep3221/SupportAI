import { scalekit } from "@/app/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
        const {searchParams}=new URL(request.url)
        const code=searchParams.get('code')
        const redirectUri=`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
        if(!code){
                return NextResponse.json({message:"Code not found"},{status:400})
        }
        const session= await scalekit.authenticateWithCode(code,redirectUri)
        console.log(session)
        const response=NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`)
        response.cookies.set('sk_session', session.accessToken,{
                httpOnly:true,
                maxAge: 60 * 60 * 24 * 7, // 7 days
                secure:false, // Set to true in production
                path:'/',
        })
        return response
}