import { rateLimit } from "../adapters/services/rate-limiter.js";
import { sendError } from "./errors.js";

export const withRateLimit =
  ({ keyPrefix, max, windowMs }) =>
  (handler) =>
  async (req, res) => {
    const limiter = rateLimit({
      key: `${keyPrefix}:${req.ip}`,
      max,
      windowMs
    });

    if (!limiter.allowed) {
      return sendError(
        res,
        Object.assign(new Error("Rate limit exceeded"), {
          code: "RATE_LIMITED"
        }),
        429
      );
    }

    return handler(req, res);
  };
