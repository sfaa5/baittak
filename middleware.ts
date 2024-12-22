import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { t } from "i18next";

// export default createMiddleware(routing);

// export const config = {

//   // Match only internationalized pathnames
//   matcher: ['/', '/(ar|en)/:path*']
// };

export default withAuth(async function middleware(request: NextRequest) {
const pathname = request.nextUrl.pathname;
const isAuth = await getToken({req:request});
const protectedRoutes = ['/profile'];

const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));

if(!isAuth && isProtectedRoute){
  return NextResponse.redirect(new URL('/',request.url));
}

},
 {
  callbacks:{
    async authorized(){
      return true;
    },
  }
}
 );

export const config =
{
  matcher: ['/','/profile/:path*']
};
