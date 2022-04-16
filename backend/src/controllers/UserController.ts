import { Response } from "express";
import { AuthRequest } from "../controllers/AuthController";
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();
export const sendEmail = async (req: AuthRequest, res: Response) =>  {

  const email =  process.env.EMAIL as string;
  const password =  process.env.PASSWORD as string;
  const username = req.user!.fullName;
  const userEmail = req.user!.email;
  const {subject, text, emails} = req.body;

  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: email,
          pass: password,
        },
      });

      // send mail with defined transport object
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

  } catch (err) {
    return res.status(400).json({
        status: "error",
        message: err.message,
    });
  }

}