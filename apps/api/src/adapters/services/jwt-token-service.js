import jwt from "jsonwebtoken";
import { apiConfig } from "@portfolio/shared";

const secret = process.env.JWT_SECRET || apiConfig.defaultJwtSecret;

export const tokenService = {
  async sign(payload) {
    return jwt.sign(payload, secret, { expiresIn: "8h" });
  },
  async verify(token) {
    return jwt.verify(token, secret);
  }
};
