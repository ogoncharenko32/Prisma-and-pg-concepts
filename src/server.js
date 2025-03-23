import express from "express";
import dotenv from "dotenv";
import authorRouter from "./routes/authorRouters.js";
import bookRouter from "./routes/bookRoutes.js";
import promClient from "prom-client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Prometheus

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestsCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

register.registerMetric(httpRequestsCounter);

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestsCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

//Expose metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
//--------------------

app.use("/api/author", authorRouter);
app.use("/api/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
