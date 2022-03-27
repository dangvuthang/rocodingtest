"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const UserController_1 = __importDefault(require("./UserController"));
const signup = (req, res) => {
    const user = await UserController_1.default.createUser(req.body);
    return res.status(200).json({
        status: "success",
        data: {
            user
        },
    });
};
exports.signup = signup;
const login = (req, res) => {
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
exports.default = {
    login: exports.login,
    signup: exports.signup,
};
//# sourceMappingURL=AuthController.js.map