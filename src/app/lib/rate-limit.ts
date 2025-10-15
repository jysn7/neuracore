import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || "",
  token: process.env.UPSTASH_REDIS_TOKEN || "",
});

type RateLimitConfig = {
  limit: number;
  window: number; // in seconds
};

const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  limit: 100, // requests
  window: 60, // per minute
};

const ROUTE_RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/ideas/create": {
    limit: 10,
    window: 3600, // 10 ideas per hour
  },
  "/api/comments/create": {
    limit: 30,
    window: 3600, // 30 comments per hour
  },
  "/api/ideas/like": {
    limit: 100,
    window: 3600, // 100 likes per hour
  },
};

export async function rateLimit(
  req: Request,
  identifier: string, // Usually user ID or IP
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const path = new URL(req.url).pathname;
  const config = ROUTE_RATE_LIMITS[path] || DEFAULT_RATE_LIMIT;

  const now = Math.floor(Date.now() / 1000);
  const key = `rate-limit:${path}:${identifier}:${Math.floor(now / config.window)}`;

  try {
    const count = await redis.incr(key);
    await redis.expire(key, config.window);

    const remaining = Math.max(0, config.limit - count);
    const reset =
      Math.floor(now / config.window) * config.window + config.window;

    return {
      success: count <= config.limit,
      limit: config.limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open - allow request if Redis is down
    return {
      success: true,
      limit: config.limit,
      remaining: 1,
      reset: now + config.window,
    };
  }
}

export function getRateLimitResponse(
  rateLimitResult: Awaited<ReturnType<typeof rateLimit>>,
) {
  if (!rateLimitResult.success) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests",
        reset: new Date(rateLimitResult.reset * 1000).toISOString(),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      },
    );
  }
  return null;
}
