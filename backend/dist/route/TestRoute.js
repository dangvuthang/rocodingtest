"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = __importDefault(require("../controller/TestController"));
const routes = express_1.default.Router();
routes.get("/:id", TestController_1.default.getTest);
routes.get("/:id", TestController_1.default.getTestByUserAndId);
routes.post("tests", TestController_1.default.createTest);
routes.patch("/:id", TestController_1.default.updateTest);
routes.delete("/delete/:id", TestController_1.default.deleteTest);
module.exports = routes;
//# sourceMappingURL=TestRoute.js.map