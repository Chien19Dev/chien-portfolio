import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const ADMIN_EMAIL = "nguyendinhchien19042003@gmail.com"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.email === ADMIN_EMAIL
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*"],
}
