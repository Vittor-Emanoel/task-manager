import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

export async function middleware(request: NextRequest) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });
  const { pathname } = request.nextUrl;
  const isLogged = Boolean(session.data);
  const isPrivatePath = pathname.startsWith("/dashboard");

  if (isLogged && !isPrivatePath) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isLogged && isPrivatePath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-up", "/login"],
};
