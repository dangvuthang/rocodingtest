"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.checkAccountInDb = exports.checkMicrosoftLogin = void 0;
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("../models/User"));
const checkMicrosoftLogin = async (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({
            status: "fail",
            message: "Required token from Microsoft",
        });
    }
    try {
        const request = await axios_1.default.get("https://graph.microsoft.com/v1.0/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = request.data;
        req.microsoftAccount = data;
        return next();
    }
    catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid token sent to server",
        });
    }
};
exports.checkMicrosoftLogin = checkMicrosoftLogin;
const checkAccountInDb = async (req, res, next) => {
    const microsoftAccount = req.microsoftAccount;
    if (!microsoftAccount) {
        return res.status(400).json({
            status: "fail",
            message: "Required login with microsoft to access this route",
        });
    }
    try {
        const userSavedInDb = await User_1.default.findOne({ email: microsoftAccount.mail });
        if (userSavedInDb) {
            req.user = userSavedInDb;
        }
        return next();
    }
    catch (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.checkAccountInDb = checkAccountInDb;
const register = async (req, res) => {
    const user = req.user;
    const microsoftAccount = req.microsoftAccount;
    const photoUrl = req.body.photoUrl;
    if (user) {
        return res.status(204).end();
    }
    if (!photoUrl) {
        return res.status(400).json({
            status: "special",
            message: "Required photoUrl to complete registration",
        });
    }
    try {
        const newUser = await User_1.default.create({
            email: microsoftAccount.mail,
            fullName: microsoftAccount.displayName,
            photoUrl,
        });
        return res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.register = register;
//# sourceMappingURL=AuthController.js.map