"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmission = exports.getSubmissionByTestId = exports.getSubmissionByUserAndTestId = exports.getSubmission = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const getSubmission = async (req, res) => {
    let submission;
    try {
        submission = await Submission_1.default.findById(req.params.id);
    }
    catch (err) {
        return res.status(400).json({
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
    if (!submission) {
        return res.status(400).json({
            status: "error",
            msg: "There is no submission found",
        });
    }
    ;
    return res.status(200).json({
        status: "success",
        data: {
            submission,
        },
    });
};
exports.getSubmission = getSubmission;
const getSubmissionByUserAndTestId = async (req, res) => {
    let submissions;
    try {
        submissions = await Submission_1.default.find({ studentId: req.params.id, testId: req.params.testId });
    }
    catch (err) {
        return res.status(400).json({
            errors: [
                {
                    msg: err,
                },
            ],
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
            errors: [
                {
                    msg: err,
                },
            ],
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
exports.getSubmissionByTestId = getSubmissionByTestId;
const createSubmission = async (req, res) => {
    const { submissionTime, content, testId, studentId } = req.body;
    let submission;
    try {
        submission = await Submission_1.default.create({ submissionTime, content, testId, studentId });
    }
    catch (err) {
        return res.status(400).json({
            errors: [
                {
                    msg: err,
                },
            ],
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