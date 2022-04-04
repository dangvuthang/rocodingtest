"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTest = exports.deleteTest = exports.createTest = exports.getTestByUserAndId = exports.getTest = void 0;
const Test_1 = __importDefault(require("../models/Test"));
const getTest = async (req, res) => {
    const id = req.params.id;
    const test = await Test_1.default.findById(id);
    if (!test) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test found in the database",
                },
            ],
        });
    }
    ;
    return res.status(200).send(test);
};
exports.getTest = getTest;
const getTestByUserAndId = async (req, res) => {
    const tests = await Test_1.default.find({ _id: req.params.testId, teacherId: req.params.userId });
    if (!tests) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test by this user",
                },
            ],
        });
    }
    ;
    return res.status(200).send(tests);
};
exports.getTestByUserAndId = getTestByUserAndId;
const createTest = async (req, res) => {
    const { name, startedDate, endDate, link, duration, question, teacherId } = req.body;
    const test = Test_1.default.create({ name, startedDate, endDate, link, duration, question, teacherId });
    return res.status(200).send(test);
};
exports.createTest = createTest;
const deleteTest = async (req, res) => {
    const test = Test_1.default.findByIdAndDelete(req.params.id);
    if (!test) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test with that id",
                },
            ],
        });
    }
    ;
    return res.status(200).send(test);
};
exports.deleteTest = deleteTest;
const updateTest = async (req, res) => {
    const test = Test_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) {
        return res.status(404).json({
            errors: [
                {
                    msg: "There is no test with that id",
                },
            ],
        });
    }
    ;
    return res.status(200).send(test);
};
exports.updateTest = updateTest;
//# sourceMappingURL=TestController.js.map