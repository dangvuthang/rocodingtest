"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const SubmissionController_1 = require("../controllers/SubmissionController");
const routes = express_1.default.Router();
exports.submissionRouter = routes;
routes.get("/:id", SubmissionController_1.getSubmission);
routes.get("/:testId", SubmissionController_1.getSubmissionByTestId);
routes.get("/:testId/users/:userId", SubmissionController_1.getSubmissionByUserAndTestId);
routes.post("/", SubmissionController_1.createSubmission);
//# sourceMappingURL=SubmissionRoute.js.map