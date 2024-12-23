import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { t } from "i18next";





  const I18nMiddleware =  createMiddleware(routing);



const withAuthMiddleware =  withAuth(
  async function middleware(request: NextRequest) {
 
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({req:request});
    const protectedRoutes = ['/User/Posts'];

    console.log(pathname)
    
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.includes(route)
    );

    console.log("auth",isAuth)
    console.log("protectd",isProtectedRoute)

    if (isAuth){
      return  I18nMiddleware(request);
    }
    
    if(!isAuth && isProtectedRoute){
      return NextResponse.redirect(new URL(new URL('/?login=true', request.url)));
    }

    return  I18nMiddleware(request);
    
    },
     {
      callbacks:{
        async authorized(){
          return true;
        },
      }
    }
     );



export default withAuthMiddleware;



export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};


