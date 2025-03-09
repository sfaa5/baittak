import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { t } from "i18next";

const I18nMiddleware = createMiddleware(routing);

const withAuthMiddleware = withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    console.log("Auth", isAuth);

    // Define protected routes
    const protectedRoutes = ["/User", "/Company","messages"];

    console.log("Pathname:", pathname);
    console.log("Authenticated User Role:", isAuth?.role);

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.includes(route)
    );

    console.log("Is Protected Route:", isProtectedRoute);

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/?login=true", request.url));
    }

    // Handle role-based access
    if (
      (isAuth?.role === "agency" && pathname.includes("/Company") ) ||
      (isAuth?.role === "user" && pathname.includes("/User") || isAuth?.role === "user" && pathname.includes("messages"))
    ) {
      return I18nMiddleware(request);
    }

    // Redirect users with invalid roles accessing protected routes
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/?unauthorized=true", request.url));
    }

    // Allow other routes
    return I18nMiddleware(request);
  },
  {
    callbacks: {
      async authorized() {
        return true; // Always allow execution; handle authorization logic in middleware
      },
    },
  }
);

export default withAuthMiddleware;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
