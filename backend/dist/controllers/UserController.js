"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (req, res) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const username = req.user.fullName;
    const userEmail = req.user.email;
    const { subject, text, emails } = req.body;
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: email,
                pass: password,
            },
        });
        const info = await transporter.sendMail({
            from: `"${username}" <${userEmail}>`,
            to: emails,
            subject: subject,
            text: text,
            headers: { 'x-myheader': 'test header' }
        });
        return res.status(200).json({
            status: "success",
            data: {
                mess: info.response,
            },
        });
    }
    catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=UserController.js.map