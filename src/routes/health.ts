import { Router, Request, Response } from "express";
import { version, name } from "../../package.json";

const router = Router();

// GET / — service metadata
router.get("/", (_req: Request, res: Response) => {
  res.json({
    service: name,
    version,
    environment: process.env.NODE_ENV ?? "development",
  });
});

// GET /health — liveness check used by load balancers and CI smoke tests
router.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: name,
    timestamp: new Date().toISOString(),
  });
});

export default router;
