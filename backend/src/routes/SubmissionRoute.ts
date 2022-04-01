import express, { Router } from 'express';
import {getSubmission, getSubmissionByTestId, getSubmissionByUserAndTestId, createSubmission} from '../controllers/SubmissionController';

const routes: Router = express.Router();

routes.get("/:id", getSubmission);
routes.get("/:testId", getSubmissionByTestId)
routes.get("/:testId/users/:userId", getSubmissionByUserAndTestId);
routes.post("/", createSubmission);

export { routes as submissionRouter }