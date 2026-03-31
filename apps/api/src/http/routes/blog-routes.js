import express from "express";
import {
  createPost,
  deletePost,
  listPosts,
  updatePost
} from "@portfolio/domain";
import { requireAdmin } from "../auth-middleware.js";
import { asyncHandler } from "../errors.js";
import { ok } from "../respond.js";

export const createBlogRouter = (container) => {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const published =
        typeof req.query.published === "string"
          ? req.query.published === "true"
          : undefined;
      ok(res, await listPosts(container, { published }));
    })
  );

  router.post(
    "/",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, await createPost(container, req.body), 201);
    })
  );

  router.put(
    "/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, await updatePost(container, req.params.id, req.body));
    })
  );

  router.delete(
    "/:id",
    requireAdmin(container),
    asyncHandler(async (req, res) => {
      ok(res, await deletePost(container, req.params.id));
    })
  );

  return router;
};
