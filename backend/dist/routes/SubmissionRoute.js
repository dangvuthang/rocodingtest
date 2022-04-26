"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const SubmissionController_1 = require("../controllers/SubmissionController");
const routes = express_1.default.Router({ mergeParams: true });
routes.use(AuthController_1.checkMicrosoftLogin, AuthController_1.checkAccountInDb);
routes.get("/", SubmissionController_1.getAllTestSubmission);
routes.post("/", SubmissionController_1.createSubmission);
routes.get("/:submissionId", SubmissionController_1.getTestSubmissionDetail);
routes.use(AuthController_1.checkIfTeacher);
exports.default = routes;
//# sourceMappingURL=SubmissionRoute.js.map