import express from "express";
import { getTestsByTeacherId } from "../controllers/TestController";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
  checkIfTeacher,
  register,
} from "../controllers/AuthController";

import {
  sendEmail
} from "../controllers/UserController";


const route = express.Router();

route.post("/register", checkMicrosoftLogin, checkAccountInDb, register);
route.get("/:userId/tests", getTestsByTeacherId);
route.use(checkMicrosoftLogin, checkAccountInDb);
route.post("/send", sendEmail);

export default route;
