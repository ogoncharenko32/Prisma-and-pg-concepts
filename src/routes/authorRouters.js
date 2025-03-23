import { Router } from "express";
import {
  addAuthorController,
  deleteAuthorConrtoller,
} from "../controllers/authorController.js";

const authorRouter = Router();

authorRouter.post("/add-author", addAuthorController);
authorRouter.delete("/delete-author/:id", deleteAuthorConrtoller);

export default authorRouter;
