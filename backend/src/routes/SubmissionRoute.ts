import express, { Router } from 'express';
import {getSubmission, getSubmissionByTestId, getSubmissionByUserAndTestId, createSubmission} from '../controllers/SubmissionController';

const routes: Router = express.Router();

routes.post("/", createSubmission);
routes.get("/:id", getSubmission);
routes.get("/:testId", getSubmissionByTestId)
routes.get("/:testId/users/:userId", getSubmissionByUserAndTestId);

export default routes;