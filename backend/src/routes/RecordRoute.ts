import express, { Router } from "express";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
} from "../controllers/AuthController";
import {
  createRecord,
  updateRecord,
  checkExistenceRecord,
} from "../controllers/RecordController";

const routes: Router = express.Router();

routes.use(checkMicrosoftLogin, checkAccountInDb);
routes.post("/", createRecord);
routes.post("/check", checkExistenceRecord);
routes.patch("/:id", updateRecord);

export default routes;
