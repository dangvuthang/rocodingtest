"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfLoginWithMicrosoft = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const UserController_1 = __importDefault(require("./UserController"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = require("util");
dotenv_1.default.config();
const signup = async (req, res) => {
    const user = await UserController_1.default.createUser(req.body);
    return res.status(200).json({
        status: "success",
        data: {
            user
        },
    });
};
exports.signup = signup;
const login = async (req, res) => {
    const user = await User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ error: "No user was found" });
    return res.status(200).json({
        status: "success",
        data: {
            user
        },
    });
};
exports.login = login;
const checkIfLoginWithMicrosoft = async (req, res) => {
    var _a, _b;
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    }
    if (token) {
        return res.status(401).json({ error: "Please login again" });
    }
    const verifyAsPromise = (0, util_1.promisify)(jsonwebtoken_1.default.verify);
    const decoded = await verifyAsPromise(token, process.env.JWT_SECRET);
    const user = await User_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
    if (!user)
        return res.status(401).json({ error: "User not found" });
    req === null || req === void 0 ? void 0 : req.user = user;
};
exports.checkIfLoginWithMicrosoft = checkIfLoginWithMicrosoft;
exports.default = {
    login: exports.login,
    signup: exports.signup,
    checkIfLoginWithMicrosoft: exports.checkIfLoginWithMicrosoft,
};
//# sourceMappingURL=AuthController.js.map