"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordByTestIdAndStudentId = exports.getRecordByTestIdAndSubmissionId = exports.getRecordByTestId = exports.createRecord = void 0;
const Record_1 = __importDefault(require("../models/Record"));
const createRecord = async (req, res) => {
    let record;
    let { attendanceDate, numberOfCheats, evidence, userId, testId, submissionId } = req.body;
    userId = req.user._id;
    try {
        record = await Record_1.default.create({ attendanceDate, numberOfCheats, evidence, userId, testId, submissionId });
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
    return res.status(201).json({
        status: "success",
        data: {
            record,
        },
    });
};
exports.createRecord = createRecord;
const getRecordByTestId = async (req, res) => {
    let records;
    try {
        records = await Record_1.default.find({ testId: req.params.testId });
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
    if (!records) {
        return res.status(400).json({
            status: "error",
            msg: "There is no record found",
        });
    }
    return res.status(201).json({
        status: "success",
        data: {
            records,
        },
    });
};
exports.getRecordByTestId = getRecordByTestId;
const getRecordByTestIdAndSubmissionId = async (req, res) => {
    let record;
    try {
        record = await Record_1.default.find({ testId: req.params.testId, submissionId: req.params.submissionId });
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
    if (!record) {
        return res.status(400).json({
            status: "error",
            msg: "There is no record found",
        });
    }
    return res.status(201).json({
        status: "success",
        data: {
            record,
        },
    });
};
exports.getRecordByTestIdAndSubmissionId = getRecordByTestIdAndSubmissionId;
const getRecordByTestIdAndStudentId = async (req, res) => {
    let record;
    try {
        record = await Record_1.default.find({ testId: req.params.testId, userId: req.params.userId });
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
    if (!record) {
        return res.status(400).json({
            status: "error",
            msg: "There is no record found",
        });
    }
    return res.status(201).json({
        status: "success",
        data: {
            record,
        },
    });
};
exports.getRecordByTestIdAndStudentId = getRecordByTestIdAndStudentId;
//# sourceMappingURL=RecordController.js.map