"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTest = exports.deleteTest = exports.createTest = exports.getTestByUserAndId = exports.getTest = exports.checkIfTeacher = void 0;
const Test_1 = __importDefault(require("../models/Test"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const checkIfTeacher = async (req, res) => {
    const email = req.microsoftAccount.mail;
    let user;
    try {
        user = User_1.default.
            findOne({ email: email }).
            populate({
            path: 'role',
            match: { name: 'teacher' }
        }).
            exec();
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
    if (!user) {
        return res.status(400).json({
            status: "error",
            msg: "This user does not have the permission to take action",
        });
    }
    ;
    return res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
};
exports.checkIfTeacher = checkIfTeacher;
const getTest = async (req, res) => {
    const id = req.params.id;
    let test;
    try {
        test = await Test_1.default.findById(id);
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
    if (!test) {
        return res.status(400).json({
            status: "error",
            msg: "There is no test found in the database",
        });
    }
    ;
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
        tests = await Test_1.default.find({ _id: req.params.testId, teacherId: req.params.userId });
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
    ;
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
    let { name, createdDate, endDate, link, duration, question, teacherId } = req.body;
    link = "http://localhost:3000/exams/" + _id;
    let test;
    try {
        test = await Test_1.default.create({ name, createdDate, endDate, link, duration, question, teacherId });
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
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
    if (!test) {
        return res.status(400).json({
            errors: [
                {
                    msg: "There is no test with that id",
                },
            ],
        });
    }
    ;
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
            errors: [
                {
                    msg: err,
                },
            ],
        });
    }
    if (!test) {
        return res.status(400).json({
            errors: [
                {
                    msg: "There is no test with that id",
                },
            ],
        });
    }
    ;
    return res.status(200).json({
        status: "success",
        data: {
            test,
        },
    });
};
exports.updateTest = updateTest;
//# sourceMappingURL=TestController.js.map