"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsByTeacherId = exports.updateTest = exports.deleteTest = exports.createTest = exports.getTestByUserAndId = exports.getTest = void 0;
const Test_1 = __importDefault(require("../models/Test"));
const mongoose_1 = __importDefault(require("mongoose"));
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const getTest = async (req, res) => {
    const id = req.params.id;
    let test;
    try {
        test = await Test_1.default.findById(id);
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
    if (!test) {
        return res.status(400).json({
            status: "error",
            msg: "There is no test found in the database",
        });
    }
    return res.status(200).json({
        status: "success",
        data: {
            test,
        },
    });
};
exports.getTest = getTest;
const getTestByUserAndId = async (req, res) => {
    let tests;
    try {
        tests = await Test_1.default.find({
            _id: req.params.testId,
            teacherId: req.params.userId,
        });
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
    if (!tests) {
        return res.status(400).json({
            status: "error",
            msg: "There is no test by this user",
        });
    }
    return res.status(200).json({
        status: "success",
        data: {
            tests,
        },
    });
};
exports.getTestByUserAndId = getTestByUserAndId;
const createTest = async (req, res) => {
    const _id = new mongoose_1.default.Types.ObjectId();
    const { name, startedDate, endDate, duration, question } = req.body;
    const teacherId = req.user._id;
    const link = "http://localhost:3000/exam/" + _id;
    let conversationSid;
    try {
        const conversation = await client.conversations.conversations.create();
        conversationSid = conversation.sid;
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
    let test;
    try {
        test = await Test_1.default.create({
            _id,
            name,
            startedDate,
            endDate,
            link,
            duration,
            question,
            teacherId,
            conversationSid,
        });
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
    return res.status(201).json({
        status: "success",
        data: {
            test,
        },
    });
};
exports.createTest = createTest;
const deleteTest = async (req, res) => {
    let test;
    try {
        test = await Test_1.default.findByIdAndDelete(req.params.id);
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
    if (!test) {
        return res.status(400).json({
            status: "error",
            message: "There is no test with that id",
        });
    }
    return res.status(204).end();
};
exports.deleteTest = deleteTest;
const updateTest = async (req, res) => {
    let test;
    try {
        test = await Test_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
    if (!test) {
        return res.status(400).json({
            status: "error",
            message: "There is no test with that id",
        });
    }
    return res.status(200).json({
        status: "success",
        data: {
            test,
        },
    });
};
exports.updateTest = updateTest;
const getTestsByTeacherId = async (req, res) => {
    let teacherId = req.params.userId;
    if (!teacherId) {
        return res.status(400).json({
            status: "fail",
            message: "Required id to process",
        });
    }
    try {
        const tests = await Test_1.default.find({ teacherId });
        return res.status(200).json({
            status: "success",
            data: {
                tests,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.getTestsByTeacherId = getTestsByTeacherId;
//# sourceMappingURL=TestController.js.map