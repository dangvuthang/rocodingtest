"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const SubmissionRoute_1 = __importDefault(require("./routes/SubmissionRoute"));
const TestRoute_1 = __importDefault(require("./routes/TestRoute"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.get("/", (_, res) => res.send("Welcome to the Mongoose & TypeScript example"));
app.use("/api/v1/users", UserRoute_1.default);
app.use("/api/v1/tests", TestRoute_1.default);
app.use("/api/v1/submission", SubmissionRoute_1.default);
app.listen(port, () => {
    console.log(`Application started successfully on port ${port}.`);
    (0, server_1.default)();
});
//# sourceMappingURL=index.js.map