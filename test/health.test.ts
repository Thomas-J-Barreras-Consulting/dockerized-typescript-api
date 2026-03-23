import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
  it("returns service metadata", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      service: "typescript-api-github-actions-ci",
      version: expect.any(String),
      environment: expect.any(String),
    });
  });
});

describe("GET /health", () => {
  it("returns ok status with a timestamp", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: "ok",
      service: "typescript-api-github-actions-ci",
      timestamp: expect.any(String),
    });

    // Timestamp should be a valid ISO 8601 date
    expect(() => new Date(res.body.timestamp)).not.toThrow();
  });
});
