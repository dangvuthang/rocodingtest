"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionRouter = void 0;
const express_1 = __importDefault(require("express"));
const SubmissionController_1 = __importDefault(require("../controller/SubmissionController"));
const routes = express_1.default.Router();
exports.submissionRouter = routes;
routes.post("/", SubmissionController_1.default.getAllUser);
routes.post("/:id", SubmissionController_1.default.getAllUser);
routes.patch("/:id", SubmissionController_1.default.getAllUser);
routes.delete("/:id", SubmissionController_1.default.);
//# sourceMappingURL=SubmissionRoute.js.map