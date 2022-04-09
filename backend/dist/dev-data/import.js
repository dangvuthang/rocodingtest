"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const User_1 = __importDefault(require("../models/User"));
const Record_1 = __importDefault(require("../models/Record"));
const Submission_1 = __importDefault(require("../models/Submission"));
const Test_1 = __importDefault(require("../models/Test"));
const users_1 = __importDefault(require("./users"));
const tests_1 = __importDefault(require("./tests"));
const records_1 = __importDefault(require("./records"));
const submissions_1 = __importDefault(require("./submissions"));
mongoose_1.default
    .connect(process.env.URI)
    .then(() => console.log("CONNECT TO DATABASE"))
    .catch((e) => console.log(e));
const importData = async () => {
    try {
        await User_1.default.create(users_1.default, {
            validateBeforeSave: false,
        });
        await Submission_1.default.create(submissions_1.default, {
            validateBeforeSave: false,
        });
        await Test_1.default.create(tests_1.default, {
            validateBeforeSave: false,
        });
        await Record_1.default.create(records_1.default, {
            validateBeforeSave: false,
        });
        console.log("DATA SUCCESSFULLY INSERTED");
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
};
const deleteData = async () => {
    try {
        await User_1.default.deleteMany();
        await Submission_1.default.deleteMany();
        await Test_1.default.deleteMany();
        await Record_1.default.deleteMany();
        console.log("DATA SUCCESSFULLY DELETED");
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
};
if (process.argv[2] === "--import")
    importData();
else if (process.argv[2] === "--delete")
    deleteData();
//# sourceMappingURL=import.js.map