import express from "express";
import { authenticateAdmin } from "@portfolio/domain";
import { asyncHandler } from "../errors.js";
import { ok } from "../respond.js";
import { requireAdmin } from "../auth-middleware.js";
import { withRateLimit } from "../rate-limit.js";

export const createAuthRouter = (container) => {
  const router = express.Router();

  router.post(
    "/login",
    asyncHandler(
      withRateLimit({
        keyPrefix: "login",
        max: 20,
        windowMs: 15 * 60 * 1000
      })(async (req, res) => {
        const result = await authenticateAdmin(container, req.body);
        ok(res, result);
      })
    )
  );

  router.get(
    "/session",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, {
        user: {
          id: req.auth.sub,
          username: req.auth.username,
          role: req.auth.role
        }
      });
    })
  );

  return router;
};
