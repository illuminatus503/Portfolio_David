import { sendError } from "./errors.js";
import { verifyAdminToken } from "@portfolio/domain";

export const requireAdmin = (container) => async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  try {
    req.auth = await verifyAdminToken(container, token);
    next();
  } catch (error) {
    const status = error.code === "AUTH_REQUIRED" ? 401 : 403;
    sendError(res, error, status);
  }
};
