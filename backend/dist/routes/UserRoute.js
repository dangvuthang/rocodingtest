"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = require("../controllers/TestController");
const AuthController_1 = require("../controllers/AuthController");
const route = express_1.default.Router();
route.post("/register", AuthController_1.checkMicrosoftLogin, AuthController_1.checkAccountInDb, AuthController_1.register);
route.get("/:userId/tests", TestController_1.getTestsByTeacherId);
exports.default = route;
//# sourceMappingURL=UserRoute.js.map