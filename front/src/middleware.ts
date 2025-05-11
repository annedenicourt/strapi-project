import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("tokenStrapi")?.value;
  //console.log("currentUser", currentUser);
  if (!currentUser) {
    return Response.redirect(new URL("/", request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/plants"],
  //matcher: [],
};
