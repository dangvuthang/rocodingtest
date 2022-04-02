"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = require("../controllers/TestController");
const routes = express_1.default.Router();
routes.post("/", TestController_1.createTest);
routes.get("/:id", TestController_1.getTest);
routes.get("/:testId/users/:userId", TestController_1.getTestByUserAndId);
routes.patch("/:id", TestController_1.updateTest);
routes.delete("/delete/:id", TestController_1.deleteTest);
exports.default = routes;
//# sourceMappingURL=TestRoute.js.map