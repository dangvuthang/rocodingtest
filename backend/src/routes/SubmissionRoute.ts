import express, { Router } from 'express';
import {
    checkAccountInDb,
    checkMicrosoftLogin,
  } from "../controllers/AuthController";
import {getSubmission, getSubmissionByTestId, getSubmissionByUserAndTestId, createSubmission} from '../controllers/SubmissionController';

const routes: Router = express.Router();

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.post("/", createSubmission);
routes.get("/:id", getSubmission);
routes.get("/:testId", getSubmissionByTestId)
routes.get("/:testId/users/:userId", getSubmissionByUserAndTestId);

export default routes;