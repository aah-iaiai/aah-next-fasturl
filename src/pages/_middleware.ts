import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith("/api/get-url/")) {
        console.log("returning early");
        return;
    }
    console.log("?? path", req.nextUrl.pathname);

    const slug = req.nextUrl.pathname.split("/").pop();

    const data = await (await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();

    console.log("?? data", data);
    if(data?.url) {
        return NextResponse.redirect(data.url);
    }

}
