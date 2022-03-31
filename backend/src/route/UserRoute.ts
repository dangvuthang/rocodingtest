import express from "express";
import {
  checkAccountInDb,
  checkMicrosoftLogin,
  register,
} from "../controller/AuthController";

const route = express.Router();

route.post("/register", checkMicrosoftLogin, checkAccountInDb, register);

export default route;
