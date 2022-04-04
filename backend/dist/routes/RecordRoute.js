"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const RecordController_1 = require("../controllers/RecordController");
const routes = express_1.default.Router();
routes.use(AuthController_1.checkMicrosoftLogin, AuthController_1.checkAccountInDb, AuthController_1.checkIfTeacher);
routes.post("/", RecordController_1.createRecord);
routes.get("/tests/:testId", RecordController_1.getRecordByTestId);
routes.get("/tests/:testId/submissions/:submissionId", RecordController_1.getRecordByTestIdAndSubmissionId);
routes.get("/tests/:testId/users/:userId", RecordController_1.getRecordByTestIdAndStudentId);
exports.default = routes;
//# sourceMappingURL=RecordRoute.js.map