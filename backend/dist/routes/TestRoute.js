"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const TestController_1 = require("../controllers/TestController");
const routes = express_1.default.Router();
routes.use(AuthController_1.checkMicrosoftLogin, AuthController_1.checkAccountInDb);
routes.get("/:id", TestController_1.getTest);
routes.use(AuthController_1.checkIfTeacher);
routes.post("/", TestController_1.createTest);
routes.get("/:testId/users/:userId", TestController_1.getTestByUserAndId);
routes.patch("/:id", TestController_1.updateTest);
routes.delete("/delete/:id", TestController_1.deleteTest);
exports.default = routes;
//# sourceMappingURL=TestRoute.js.map