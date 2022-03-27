import express, { Express, Request, Response, Router } from 'express';
import UserController from '../controller/UserController';
import AuthController from '../controller/Authontroller';

const routes: Router = express.Router();
// export default ({ app }: TRoutesInput) => {
//   app.post('/api/user', async (req, res) => {
//     const user = await UserController.CreateUser({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email
//     });

//     const pet = await PetController.CreatePet({
//       owner: user._id,
//       name: req.body.petName
//     });

//     return res.send({ user, pet });
//   });
// };


routes.get("/", UserController.getAllUser);
routes.get("/:id", UserController.getById);
routes.patch("/update", UserController.update);

routes.post("/login", AuthController.login);
routes.post("/signup", AuthController.signup);
routes.post("/check", AuthController.checkIfLoginWithMicrosoft);


module.exports = routes;