"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfTeacher = exports.register = exports.checkAccountInDb = exports.checkMicrosoftLogin = void 0;
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("../models/User"));
const checkMicrosoftLogin = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
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
        const userSavedInDb = await User_1.default.findOne({
            email: microsoftAccount.mail.toLowerCase(),
        });
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
        return res.status(200).json({
            status: "success",
            data: { user },
        });
    }
    if (!photoUrl) {
        return res.status(400).json({
            status: "special",
            message: "Required photoUrl to complete registration",
        });
    }
    try {
        const newUser = await User_1.default.create({
            email: microsoftAccount.mail.toLowerCase(),
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
const checkIfTeacher = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "This user does not have in database",
        });
    }
    if (user.role !== "teacher") {
        return res.status(403).json({
            status: "error",
            message: "This user does not have the permission to take action",
        });
    }
    return next();
};
exports.checkIfTeacher = checkIfTeacher;
//# sourceMappingURL=AuthController.js.map