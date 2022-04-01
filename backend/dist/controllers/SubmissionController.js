"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmission = exports.getSubmissionByTestId = exports.getSubmissionByUserAndTestId = exports.getSubmission = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const getSubmission = async (req, res) => {
    const submission = await Submission_1.default.findById(req.params.id);
    if (!submission) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test by this user",
                },
            ],
        });
    }
    ;
    return res.status(200).send(submission);
};
exports.getSubmission = getSubmission;
const getSubmissionByUserAndTestId = async (req, res) => {
    const submissions = await Submission_1.default.find({ studentId: req.params.id, testId: req.params.testId });
    if (!submissions) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test by this user",
                },
            ],
        });
    }
    ;
    return res.status(200).send(submissions);
};
exports.getSubmissionByUserAndTestId = getSubmissionByUserAndTestId;
const getSubmissionByTestId = async (req, res) => {
    const submissions = await Submission_1.default.find({ testId: req.params.testId });
    if (!submissions) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test by this user",
                },
            ],
        });
    }
    ;
    return res.status(200).send(submissions);
};
exports.getSubmissionByTestId = getSubmissionByTestId;
const createSubmission = async (req, res) => {
    const { submissionTime, content, testId, studentId } = req.body;
    const submission = await Submission_1.default.create({ submissionTime, content, testId, studentId });
    return res.status(200).send(submission);
};
exports.createSubmission = createSubmission;
//# sourceMappingURL=SubmissionController.js.map