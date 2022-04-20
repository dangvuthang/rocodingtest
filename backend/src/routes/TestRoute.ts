import express, { Router } from "express";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
  checkIfTeacher,
} from "../controllers/AuthController";
import {
  getTest,
  getTestByUserAndId,
  createTest,
  updateTest,
  deleteTest,
} from "../controllers/TestController";
import SubmissionRouter from "./SubmissionRoute";
const routes: Router = express.Router();

routes.use("/:testId/submissions", SubmissionRouter);

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.get("/:id", getTest);
routes.use(checkIfTeacher);
routes.post("/", createTest);
routes.patch("/:id", updateTest);
routes.delete("/:id", deleteTest);
routes.get("/:testId/users/:userId", getTestByUserAndId);

export default routes;
