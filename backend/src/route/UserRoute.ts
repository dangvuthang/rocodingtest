import express, { Express, Request, Response, Router } from 'express';
import UserController from '../controller/UserController';
import AuthController from '../controller/AuthController';

const routes: Router = express.Router();

routes.get("/", UserController.getAllUser);
routes.get("/:id", UserController.getById);
routes.patch("/update", UserController.update);

routes.post("/api/v1/users/login", AuthController.login);
routes.post("/api/v1/users/signup", AuthController.signup);
routes.post("/api/v1/users/check", AuthController.checkIfLoginWithMicrosoft);


module.exports = routes;