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
   
     // Define protected routes by role
     const protectedRoutes = {
      user: ['/User/Posts'],
      agency: ['/Company'],
    };

  
    console.log("Pathname:", pathname);
    console.log("Authenticated User Role:", isAuth?.role);
   
    // Determine if the current route is protected based on the user's role
    const isProtectedRoute = Object.entries(protectedRoutes).some(([role, routes]) =>
      routes.some((route) => pathname.includes(route) && isAuth?.role === role)
    );


 console.log("Is Protected Route:", isProtectedRoute);


     // Redirect unauthenticated users trying to access protected routes
     if (!isAuth && Object.values(protectedRoutes).flat().some((route) => pathname.includes(route))) {
      return NextResponse.redirect(new URL('/?login=true', request.url));
    }


  // Redirect users to their allowed routes based on their roles
    if (isAuth?.role === 'agency' && pathname.includes('/Company')) {
      return I18nMiddleware(request);
    }

    if (isAuth?.role === 'user' && pathname.includes('/User/Posts')) {
      return I18nMiddleware(request);
    }

    // Handle other cases (e.g., authenticated users on unprotected routes)
    return I18nMiddleware(request);
    
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


