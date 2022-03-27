"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./server"));
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Welcome to the Mongoose & TypeScript example'));
app.listen(port, () => {
    console.log(`Application started successfully on port ${port}.`);
    (0, server_1.default)();
});
//# sourceMappingURL=index.js.map