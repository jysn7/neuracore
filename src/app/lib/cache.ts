import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || "",
  token: process.env.UPSTASH_REDIS_TOKEN || "",
});

type CacheConfig = {
  ttl: number; // Time to live in seconds
};

const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttl: 3600, // 1 hour
};

const CACHE_CONFIGS: Record<string, CacheConfig> = {
  ideas: {
    ttl: 300, // 5 minutes
  },
  "trending-ideas": {
    ttl: 900, // 15 minutes
  },
  "user-profile": {
    ttl: 1800, // 30 minutes
  },
};

export function getCacheKey(
  prefix: string,
  identifier: string,
): string {
  return `cache:${prefix}:${identifier}`;
}

export async function getFromCache<T>(
  prefix: string,
  identifier: string,
): Promise<T | null> {
  try {
    const key = getCacheKey(prefix, identifier);
    const cachedData = await redis.get<string>(key);
    
    if (!cachedData) {
      return null;
    }

    try {
      return JSON.parse(cachedData) as T;
    } catch (parseError) {
      console.error("Cache parse error:", parseError);
      // Invalidate corrupt cache data
      await invalidateCache(prefix, identifier);
      return null;
    }
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
}

export async function setInCache(
  prefix: string,
  identifier: string,
  data: unknown,
  config?: CacheConfig,
): Promise<boolean> {
  try {
    if (data === null || data === undefined) {
      console.warn("Attempted to cache null or undefined data");
      return false;
    }

    const key = getCacheKey(prefix, identifier);
    const cacheConfig = config || CACHE_CONFIGS[prefix] || DEFAULT_CACHE_CONFIG;
    
    const serializedData = JSON.stringify(data);
    if (!serializedData) {
      console.warn("Data serialization failed");
      return false;
    }

    await redis.set(key, serializedData, { ex: cacheConfig.ttl });
    return true;
  } catch (error) {
    console.error("Cache set error:", error);
    return false;
  }
}

export async function invalidateCache(
  prefix: string,
  identifier: string,
): Promise<boolean> {
  try {
    const key = getCacheKey(prefix, identifier);
    const result = await redis.del(key);
    return result > 0;
  } catch (error) {
    console.error("Cache invalidation error:", error);
    return false;
  }
}

export async function invalidateCachePattern(pattern: string): Promise<boolean> {
  try {
    const keys = await redis.keys(`cache:${pattern}*`);
    if (keys.length === 0) {
      return true; // No keys to delete is still a successful operation
    }
    
    const result = await redis.del(...keys);
    return result > 0;
  } catch (error) {
    console.error("Cache pattern invalidation error:", error);
    return false;
  }
}
