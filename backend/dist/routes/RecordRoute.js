"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const RecordController_1 = require("../controllers/RecordController");
const routes = express_1.default.Router();
routes.use(AuthController_1.checkMicrosoftLogin, AuthController_1.checkAccountInDb);
routes.post("/", RecordController_1.createRecord);
routes.post("/check", RecordController_1.checkExistenceRecord);
routes.patch("/:id", RecordController_1.updateRecord);
exports.default = routes;
//# sourceMappingURL=RecordRoute.js.map