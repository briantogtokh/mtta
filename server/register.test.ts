import express from "express";
import request from "supertest";
import { describe, it, expect } from "vitest";
import { registerBasicApi } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
registerBasicApi(app);
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

describe("POST /api/register", () => {
  it("returns 201 and ok true for valid body", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ email: "a@b.com", password: "secret" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ ok: true });
  });

  it("returns 400 when fields missing", async () => {
    const res = await request(app).post("/api/register").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
