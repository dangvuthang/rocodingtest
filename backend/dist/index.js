"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubmissionRoute_1 = require("./routes/SubmissionRoute");
const TestRoute_1 = require("./routes/TestRoute");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use("/api/v1/tests", TestRoute_1.testRouter);
app.use("/api/v1/submission", SubmissionRoute_1.submissionRouter);
app.listen(3000, () => {
    console.log('server is listening on port 3000');
});
//# sourceMappingURL=index.js.map