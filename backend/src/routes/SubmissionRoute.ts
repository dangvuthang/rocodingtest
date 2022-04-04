import express, { Router } from 'express';
import {
    checkAccountInDb,
    checkMicrosoftLogin,
  } from "../controllers/AuthController";
import {getSubmissionByTestId, getSubmissionByUserAndTestId, createSubmission} from '../controllers/SubmissionController';

const routes: Router = express.Router();

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.post("/", createSubmission);
routes.get("/tests/:testId", getSubmissionByTestId)
routes.get("/tests/:testId/users/:userId", getSubmissionByUserAndTestId);

export default routes;