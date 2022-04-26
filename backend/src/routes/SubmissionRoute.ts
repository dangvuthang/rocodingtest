import express, { Router } from "express";
import {
  checkAccountInDb,
  checkIfTeacher,
  checkMicrosoftLogin,
} from "../controllers/AuthController";
import {
  createSubmission,
  getAllTestSubmission,
  getTestSubmissionDetail,
} from "../controllers/SubmissionController";

const routes: Router = express.Router({ mergeParams: true });

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.get("/", getAllTestSubmission);
routes.post("/", createSubmission);
routes.get("/:submissionId", getTestSubmissionDetail);
routes.use(checkIfTeacher);

export default routes;
