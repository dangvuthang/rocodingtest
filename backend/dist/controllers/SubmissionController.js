"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestSubmissionDetail = exports.getAllTestSubmission = exports.createSubmission = exports.getSubmissionByTestId = exports.getSubmissionByUserAndTestId = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const getSubmissionByUserAndTestId = async (req, res) => {
    let submissions;
    try {
        submissions = await Submission_1.default.find({
            studentId: req.params.id,
            testId: req.params.testId,
        });
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
    return res.status(200).json({
        status: "success",
        data: {
            submissions,
        },
    });
};
exports.getSubmissionByTestId = getSubmissionByTestId;
const createSubmission = async (req, res) => {
    var _a;
    let submission;
    try {
        submission = await Submission_1.default.create({
            content: req.body.content,
            testId: req.params.testId,
            studentId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            recordId: req.body.recordId,
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
            submission,
        },
    });
};
exports.createSubmission = createSubmission;
const getAllTestSubmission = async (req, res) => {
    try {
        const submissions = await Submission_1.default.find({
            testId: req.params.testId,
        }).populate("studentId");
        res.status(200).json({
            status: "success",
            data: {
                submissions,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.getAllTestSubmission = getAllTestSubmission;
const getTestSubmissionDetail = async (req, res) => {
    try {
        const submissions = await Submission_1.default.findById(req.params.submissionId).populate(["studentId", "recordId"]);
        res.status(200).json({
            status: "success",
            data: {
                submissions,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.getTestSubmissionDetail = getTestSubmissionDetail;
//# sourceMappingURL=SubmissionController.js.map