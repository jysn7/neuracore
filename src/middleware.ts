import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // Ensure cookies persist properly
          const cookieOptions = {
            ...options,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: options.maxAge || 7 * 24 * 60 * 60, // Default to 7 days if not specified
          };

          request.cookies.set({
            name,
            value,
            ...cookieOptions,
          });
          response.cookies.set({
            name,
            value,
            ...cookieOptions,
          });
        },
        remove(name: string, options: any) {
          const cookieOptions = {
            ...options,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          };

          request.cookies.set({
            name,
            value: "",
            ...cookieOptions,
          });
          response.cookies.set({
            name,
            value: "",
            ...cookieOptions,
          });
        },
      },
    }
  );

  // Public routes that don't require authentication
  const publicUrls = ["/login", "/signup", "/auth"];
  const isPublicPage = publicUrls.some((url) =>
    request.nextUrl.pathname.startsWith(url)
  );

  // Allow root path without redirect
  const isRootPath = request.nextUrl.pathname === "/";

  try {
    // Always attempt to refresh the session first
    const { data: { session }, error: refreshError } = await supabase.auth.getSession();
    
    if (refreshError) {
      console.error("Session refresh error:", refreshError);
      // Continue with the request if refresh fails
      return response;
    }

    // Handle authentication - redirect unauthenticated users to login
    if (!session && !isPublicPage && !isRootPath) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect authenticated users from login/signup to trending-ideas
    if (session && isPublicPage && !isRootPath) {
      return NextResponse.redirect(new URL("/trending-ideas", request.url));
    }

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return response;
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Images and other static assets
     */
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};