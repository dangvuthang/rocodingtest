"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const SubmissionController_1 = require("../controllers/SubmissionController");
const routes = express_1.default.Router();
routes.use(AuthController_1.checkMicrosoftLogin, AuthController_1.checkAccountInDb);
routes.post("/", SubmissionController_1.createSubmission);
routes.get("/:id", SubmissionController_1.getSubmission);
routes.get("/:testId", SubmissionController_1.getSubmissionByTestId);
routes.get("/:testId/users/:userId", SubmissionController_1.getSubmissionByUserAndTestId);
exports.default = routes;
//# sourceMappingURL=SubmissionRoute.js.map