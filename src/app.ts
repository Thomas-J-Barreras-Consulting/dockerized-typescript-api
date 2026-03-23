import express from "express";
import healthRouter from "./routes/health";

const app = express();

app.use(express.json());

// Mount the health/root routes
app.use("/", healthRouter);

export default app;
