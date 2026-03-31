import express from "express";
import {
  createProject,
  deleteProject,
  listProjects,
  updateProject
} from "@portfolio/domain";
import { requireAdmin } from "../auth-middleware.js";
import { asyncHandler } from "../errors.js";
import { ok } from "../respond.js";

export const createProjectsRouter = (container) => {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      ok(res, await listProjects(container));
    })
  );

  router.post(
    "/",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, await createProject(container, req.body), 201);
    })
  );

  router.put(
    "/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, await updateProject(container, req.params.id, req.body));
    })
  );

  router.delete(
    "/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, await deleteProject(container, req.params.id));
    })
  );

  return router;
};
