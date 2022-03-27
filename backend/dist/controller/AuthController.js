"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require();
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const createJWT = async (id) => await promisify(jwt.sign)({ id }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * parseInt(process.env.JWT_EXPIRE),
});
exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);
    const token = await createJWT(user.id);
    return res.status(200).json({
        status: "success",
        data: {
            user,
            token,
        },
    });
});
exports.login = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return next(new AppError("No user was found", 404));
    const token = await createJWT(user.id);
    return res.status(200).json({
        status: "success",
        data: {
            user,
            token,
        },
    });
});
exports.checkUser = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    if (!token)
        return next(new AppError("Please login to access this route", 401));
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!token)
        return next(new AppError("User not found", 404));
    req.user = user;
    next();
});
exports.checkIfLoginWithMicrosoft = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        microsoftUniqueId: req.body.microsoftUniqueId,
    });
    if (!user)
        return next(new AppError("User not exist", 404));
    const token = await createJWT(user.id);
    res.status(200).json({
        status: "success",
        data: {
            user,
            token,
        },
    });
});
//# sourceMappingURL=AuthController.js.map