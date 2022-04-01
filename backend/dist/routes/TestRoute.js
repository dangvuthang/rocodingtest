"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const TestController_1 = require("../controllers/TestController");
const routes = express_1.default.Router();
exports.testRouter = routes;
routes.get("/:id", TestController_1.getTest);
routes.get("/:testId/users/:userId", TestController_1.getTestByUserAndId);
routes.post("/", TestController_1.createTest);
routes.patch("/:id", TestController_1.updateTest);
routes.delete("/delete/:id", TestController_1.deleteTest);
//# sourceMappingURL=TestRoute.js.map