import express from "express";
import cors from "cors";
import { createContainer } from "../infrastructure/container.js";
import { sendError } from "./errors.js";
import { ok } from "./respond.js";
import { createAuthRouter } from "./routes/auth-routes.js";
import { createProjectsRouter } from "./routes/projects-routes.js";
import { createBlogRouter } from "./routes/blog-routes.js";
import { createContactRouter } from "./routes/contact-routes.js";

export const createApp = () => {
  const container = createContainer();
  const app = express();

  app.use(cors({ origin: true, credentials: false }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    ok(res, { ok: true });
  });

  app.use("/api/auth", createAuthRouter(container));
  app.use("/api/projects", createProjectsRouter(container));
  app.use("/api/blog", createBlogRouter(container));
  app.use("/api/contact", createContactRouter(container));

  app.use((error, _req, res, _next) => {
    if (error.code === "INVALID_CREDENTIALS") {
      return sendError(res, error, 401);
    }
    if (error.code?.endsWith("_NOT_FOUND")) {
      return sendError(res, error, 404);
    }
    if (error.name === "ZodError") {
      return sendError(
        res,
        Object.assign(new Error("Validation failed"), {
          code: "VALIDATION_ERROR",
          details: error.flatten()
        }),
        400
      );
    }
    console.error(error);
    return sendError(res, error, 500);
  });

  return app;
};
