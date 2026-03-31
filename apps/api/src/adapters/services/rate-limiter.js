const windows = new Map();

export const rateLimit = ({ key, max, windowMs }) => {
  const now = Date.now();
  const entry = windows.get(key) ?? { count: 0, resetAt: now + windowMs };

  if (entry.resetAt < now) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count += 1;
  windows.set(key, entry);

  return {
    allowed: entry.count <= max,
    remaining: Math.max(max - entry.count, 0),
    resetAt: entry.resetAt
  };
};
