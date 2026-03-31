import express from "express";
import cors from "cors";
import {
  authenticateAdmin,
  createPost,
  createProject,
  deletePost,
  deleteProject,
  listPosts,
  listProjects,
  submitContactForm,
  updatePost,
  updateProject
} from "@portfolio/domain";
import { createContainer } from "../infrastructure/container.js";
import { asyncHandler, sendError } from "./errors.js";
import { requireAdmin } from "./auth-middleware.js";
import { rateLimit } from "../adapters/services/rate-limiter.js";

export const createApp = () => {
  const container = createContainer();
  const app = express();

  app.use(cors({ origin: true, credentials: false }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ data: { ok: true } });
  });

  app.post(
    "/api/auth/login",
    asyncHandler(async (req, res) => {
      const limiter = rateLimit({
        key: `login:${req.ip}`,
        max: 20,
        windowMs: 15 * 60 * 1000
      });
      if (!limiter.allowed) {
        return sendError(
          res,
          Object.assign(new Error("Too many login attempts"), {
            code: "RATE_LIMITED"
          }),
          429
        );
      }

      const result = await authenticateAdmin(container, req.body);
      res.json({ data: result });
    })
  );

  app.get(
    "/api/projects",
    asyncHandler(async (_req, res) => {
      const data = await listProjects(container);
      res.json({ data });
    })
  );

  app.post(
    "/api/projects",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      const data = await createProject(container, req.body);
      res.status(201).json({ data });
    })
  );

  app.put(
    "/api/projects/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      const data = await updateProject(container, req.params.id, req.body);
      res.json({ data });
    })
  );

  app.delete(
    "/api/projects/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      const data = await deleteProject(container, req.params.id);
      res.json({ data });
    })
  );

  app.get(
    "/api/blog",
    asyncHandler(async (req, res) => {
      const published =
        typeof req.query.published === "string"
          ? req.query.published === "true"
          : undefined;
      const data = await listPosts(container, { published });
      res.json({ data });
    })
  );

  app.post(
    "/api/blog",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      const data = await createPost(container, req.body);
      res.status(201).json({ data });
    })
  );

  app.put(
    "/api/blog/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      const data = await updatePost(container, req.params.id, req.body);
      res.json({ data });
    })
  );

  app.delete(
    "/api/blog/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      const data = await deletePost(container, req.params.id);
      res.json({ data });
    })
  );

  app.post(
    "/api/contact",
    asyncHandler(async (req, res) => {
      const limiter = rateLimit({
        key: `contact:${req.ip}`,
        max: 10,
        windowMs: 60 * 60 * 1000
      });
      if (!limiter.allowed) {
        return sendError(
          res,
          Object.assign(new Error("Too many contact submissions"), {
            code: "RATE_LIMITED"
          }),
          429
        );
      }

      const data = await submitContactForm(container, req.body);
      res.status(201).json({ data });
    })
  );

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
