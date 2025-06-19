import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

const createRouteMatcher = (patterns: (string | RegExp)[]) => {
  return (req: NextRequest) => {
    const url = req.nextUrl.pathname;
    return patterns.some((pattern) => {
      if (typeof pattern === 'string') {
        const regex = new RegExp(`^${pattern}$`.replace(/\(\.\*\)/g, '.*'));
        return regex.test(url);
      } else if (pattern instanceof RegExp) {
        return pattern.test(url);
      }
      return false;
    });
  };
};

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  if (isProtectedRoute(req)) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.redirect(
        new URL(process.env.NEXT_PUBLIC_SIGN_IN_URL, req.url)
      );
    }
  }

  return res;
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export default middleware;
