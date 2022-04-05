"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmission = exports.getSubmissionByTestId = exports.getSubmissionByUserAndTestId = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const getSubmissionByUserAndTestId = async (req, res) => {
    let submissions;
    try {
        submissions = await Submission_1.default.find({ studentId: req.params.id, testId: req.params.testId });
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
    if (!submissions) {
        return res.status(400).json({
            status: "error",
            msg: "There is no submission found",
        });
    }
    ;
    return res.status(200).json({
        status: "success",
        data: {
            submissions,
        },
    });
};
exports.getSubmissionByUserAndTestId = getSubmissionByUserAndTestId;
const getSubmissionByTestId = async (req, res) => {
    let submissions;
    try {
        submissions = await Submission_1.default.find({ testId: req.params.testId });
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
    if (!submissions) {
        return res.status(400).json({
            status: "error",
            message: "There is no submission found",
        });
    }
    ;
    return res.status(200).json({
        status: "success",
        data: {
            submissions,
        },
    });
};
exports.getSubmissionByTestId = getSubmissionByTestId;
const createSubmission = async (req, res) => {
    let submission;
    let { submissionTime, content, testId, studentId } = req.body;
    studentId = req.user._id;
    try {
        submission = await Submission_1.default.create({ submissionTime, content, testId, studentId });
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
            submission,
        },
    });
};
exports.createSubmission = createSubmission;
//# sourceMappingURL=SubmissionController.js.map