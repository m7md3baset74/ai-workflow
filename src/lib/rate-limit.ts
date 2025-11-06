import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  interval: number;
  uniqueTokenPerInterval?: number;
};

type RateLimitData = {
  count: number;
  resetTime: number;
};

export default function rateLimit(options: RateLimitOptions) {
  const tokenCache = new LRUCache<string, RateLimitData>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval,
  });

  return {
    check: (limit: number, token: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const now = Date.now();
        const tokenData = tokenCache.get(token);

        if (!tokenData) {
          // First request for this token
          tokenCache.set(token, {
            count: 1,
            resetTime: now + options.interval,
          });
          resolve();
          return;
        }

        if (now > tokenData.resetTime) {
          // Time window has passed, reset
          tokenCache.set(token, {
            count: 1,
            resetTime: now + options.interval,
          });
          resolve();
          return;
        }

        if (tokenData.count >= limit) {
          // Rate limit exceeded
          reject(new Error('Rate limit exceeded'));
          return;
        }

        // Increment count
        tokenCache.set(token, {
          count: tokenData.count + 1,
          resetTime: tokenData.resetTime,
        });
        resolve();
      });
    },
  };
}