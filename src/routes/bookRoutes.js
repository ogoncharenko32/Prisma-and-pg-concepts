import { Router } from "express";
import {
  addBookController,
  deleteBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
} from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.post("/add-book", addBookController);
bookRouter.get("/get-all-books", getAllBooksController);
bookRouter.get("/get-book/:id", getBookByIdController);
bookRouter.put("/update-book/:id", updateBookController);
bookRouter.delete("/delete-book/:id", deleteBookController);

export default bookRouter;
