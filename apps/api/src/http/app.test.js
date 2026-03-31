import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("API", () => {
  const app = createApp();

  it("returns projects", async () => {
    const response = await request(app).get("/api/projects");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("rejects invalid contact payloads", async () => {
    const response = await request(app).post("/api/contact").send({
      name: "",
      email: "bad",
      subject: "",
      message: "short"
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 401 for auth session without token", async () => {
    const response = await request(app).get("/api/auth/session");
    expect(response.statusCode).toBe(401);
    expect(response.body.error.code).toBe("AUTH_REQUIRED");
  });
});
