import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest) {
        const cookieStore = await cookies()
        cookieStore.delete("sk_session")
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`)
}