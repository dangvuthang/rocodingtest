import express, { Router } from 'express';
import {
    checkAccountInDb,
    checkMicrosoftLogin,
  } from "../controllers/AuthController";
import {checkIfTeacher, getTest, getTestByUserAndId, createTest, updateTest, deleteTest} from '../controllers/TestController';

const routes: Router = express.Router();

routes.use(checkMicrosoftLogin, checkAccountInDb, checkIfTeacher);
routes.post("/", createTest);
routes.get("/:id", getTest);
routes.get("/:testId/users/:userId", getTestByUserAndId);
routes.patch("/:id", updateTest);
routes.delete("/delete/:id", deleteTest);

export default routes;