import express, { Router } from "express";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
} from "../controllers/AuthController";
import {
  getSubmission
} from "../controllers/TerminalController";

const routes: Router = express.Router();

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.post("/", getSubmission);

export default routes;
