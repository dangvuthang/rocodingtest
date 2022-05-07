"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecord = exports.checkExistenceRecord = exports.createRecord = void 0;
const Record_1 = __importDefault(require("../models/Record"));
const createRecord = async (req, res) => {
    try {
        const record = await Record_1.default.create({
            userId: req.user._id,
            testId: req.body.testId,
        });
        res.status(201).json({
            status: "success",
            data: {
                record,
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
exports.createRecord = createRecord;
const checkExistenceRecord = async (req, res) => {
    try {
        const record = await Record_1.default.findOne({
            userId: req.user._id,
            testId: req.body.testId,
        });
        console.log(record);
        if (!record) {
            res.status(200).json({
                status: "allowed",
            });
        }
        else {
            res.status(400).json({
                status: "diallowed",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.checkExistenceRecord = checkExistenceRecord;
const updateRecord = async (req, res) => {
    try {
        const record = await Record_1.default.findById(req.params.id);
        if (record) {
            record.numberOfCheats++;
            record.evidence.push(req.body.evidence);
            await record.save();
            res.status(204).end();
        }
        else {
            res.status(404).json({
                status: "fail",
                message: "Not found current record",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.updateRecord = updateRecord;
//# sourceMappingURL=RecordController.js.map