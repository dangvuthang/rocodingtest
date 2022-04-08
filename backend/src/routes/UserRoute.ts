import express from "express";
import { getTestsByTeacherId } from "../controllers/TestController";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
  register,
} from "../controllers/AuthController";

const route = express.Router();

route.post("/register", checkMicrosoftLogin, checkAccountInDb, register);
route.get("/:userId/tests", getTestsByTeacherId);
export default route;
