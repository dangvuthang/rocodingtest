"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./route/UserRoute"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.get("/", (_, res) => res.send("Welcome to the Mongoose & TypeScript example"));
app.use("/api/v1/users", UserRoute_1.default);
app.listen(port, () => {
    console.log(`Application started successfully on port ${port}.`);
    (0, server_1.default)();
});
//# sourceMappingURL=index.js.map