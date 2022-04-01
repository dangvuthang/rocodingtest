"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubmission = exports.createSubmission = exports.findByTestId = exports.findByStudentId = exports.findById = exports.findByStudentAndTestId = void 0;
const Submission_1 = __importDefault(require("../models/Submission"));
const findByStudentAndTestId = async (studentId, testId) => {
    return await Submission_1.default.find({ studentId: studentId, testId: testId });
};
exports.findByStudentAndTestId = findByStudentAndTestId;
const findById = async (id) => {
    return await Submission_1.default.findById(id);
};
exports.findById = findById;
const findByStudentId = async (studentId) => {
    return await Submission_1.default.find({ studentId: studentId });
};
exports.findByStudentId = findByStudentId;
const findByTestId = async (testId) => {
    return await Submission_1.default.find({ testId: testId });
};
exports.findByTestId = findByTestId;
const createSubmission = async (submissionTime, content, testId, studentId) => {
    return Submission_1.default.create({ submissionTime, content, testId, studentId })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
};
exports.createSubmission = createSubmission;
const deleteSubmission = async (id) => {
    return await Submission_1.default.findByIdAndDelete(id);
};
exports.deleteSubmission = deleteSubmission;
//# sourceMappingURL=SubmissionController.js.map