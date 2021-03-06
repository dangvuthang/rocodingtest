"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmission = void 0;
const axios_1 = __importDefault(require("axios"));
const getSubmission = async (req, res) => {
    const { language, source, stdin } = req.body;
    const methodPost = 'POST';
    const methodGet = 'GET';
    const judgeKey = process.env.JUDGE_SECRET;
    let language_id;
    if (language == 'python') {
        language_id = 70;
    }
    else if (language == 'c++') {
        language_id = 52;
    }
    else if (language == 'java') {
        language_id = 62;
    }
    else if (language == 'javascript') {
        language_id = 63;
    }
    let options = {
        method: methodPost,
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': judgeKey
        },
        data: {
            "source_code": Buffer.from(source, 'binary').toString('base64'),
            "language_id": language_id,
            "stdin": stdin,
        }
    };
    try {
        let response = await axios_1.default.request(options);
        let { token } = response.data;
        let responseResult;
        if (token) {
            let solutions = {
                method: methodGet,
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: { base64_encoded: 'true', fields: '*' },
                headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': judgeKey
                }
            };
            responseResult = await axios_1.default.request(solutions);
        }
        let { stdout, time, memory, stderr, compile_output } = responseResult.data;
        if (stdout) {
            let output = Buffer.from(stdout, 'base64').toString('binary');
            console.log(output);
            return res.status(200).json({
                status: "success",
                data: {
                    "output": output,
                    "execution_time": time,
                    "memory": memory
                },
            });
        }
        else if (stderr) {
            let error = Buffer.from(stderr, 'base64').toString('binary');
            return res.status(400).json({
                status: "error",
                msg: error
            });
        }
        else {
            let compilation_error_mss = Buffer.from(compile_output, 'base64').toString('binary');
            return res.status(400).json({
                status: "error",
                msg: compilation_error_mss
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.getSubmission = getSubmission;
//# sourceMappingURL=TerminalController.js.map