import express from "express";
import { submitContactForm } from "@portfolio/domain";
import { asyncHandler } from "../errors.js";
import { ok } from "../respond.js";
import { withRateLimit } from "../rate-limit.js";

export const createContactRouter = (container) => {
  const router = express.Router();

  router.post(
    "/",
    asyncHandler(
      withRateLimit({
        keyPrefix: "contact",
        max: 10,
        windowMs: 60 * 60 * 1000
      })(async (req, res) => {
        ok(res, await submitContactForm(container, req.body), 201);
      })
    )
  );

  return router;
};
