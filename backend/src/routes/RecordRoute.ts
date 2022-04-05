import express, { Router } from "express";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
  checkIfTeacher,
} from "../controllers/AuthController";
import {
  getRecordByTestId,
  getRecordByTestIdAndStudentId,
  createRecord,
} from "../controllers/RecordController";

const routes: Router = express.Router();

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.post("/", createRecord);
routes.use(checkIfTeacher);
routes.get("/tests/:testId", getRecordByTestId);
routes.get("/tests/:testId/users/:userId", getRecordByTestIdAndStudentId);

export default routes;
