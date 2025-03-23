import express from "express";
import dotenv from "dotenv";
import authorRouter from "./routes/authorRouters.js";
import bookRouter from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/author", authorRouter);
app.use("/api/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
