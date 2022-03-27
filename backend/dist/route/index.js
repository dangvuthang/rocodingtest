"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const Authontroller_1 = __importDefault(require("../controller/Authontroller"));
const routes = express_1.default.Router();
routes.get("/", UserController_1.default.getAllUser);
routes.get("/:id", UserController_1.default.getById);
routes.patch("/update", UserController_1.default.update);
routes.post("/login", Authontroller_1.default.login);
routes.post("/signup", Authontroller_1.default.signup);
routes.post("/check", Authontroller_1.default.checkIfLoginWithMicrosoft);
module.exports = routes;
//# sourceMappingURL=index.js.map