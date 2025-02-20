import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = cookies(); // Await is not needed here

  const token = (await cookieStore).get("token"); // `get` now works

  console.log("Middleware running...");
  console.log("Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Ensure all dashboard routes are protected
};
