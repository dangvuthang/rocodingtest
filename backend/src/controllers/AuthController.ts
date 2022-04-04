import { Request, Response, NextFunction } from "express";
import axios from "axios";
import User, { IUser } from "../models/User";

interface IMicrosoftAccount {
  displayName: string;
  mail: string;
  id: string;
}

export interface AuthRequest extends Request {
  microsoftAccount?: IMicrosoftAccount;
  user?: IUser;
  photoUrl?: String;
}

// Check if token sent by client is a valid Microsoft access token
export const checkMicrosoftLogin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.token;
  // No token end request immediately
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Required token from Microsoft",
    });
  }
  try {
    // Send token to Microsoft to validate
    const request = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = request.data;
    // Add microsoftAccount to request object for next middleware
    req.microsoftAccount = data;
    return next();
  } catch (error) {
    // Error end request
    return res.status(400).json({
      status: "fail",
      message: "Invalid token sent to server",
    });
  }
};

// Check if microsoftAccount is already registered in our DB
export const checkAccountInDb = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const microsoftAccount = req.microsoftAccount;
  if (!microsoftAccount) {
    return res.status(400).json({
      status: "fail",
      message: "Required login with microsoft to access this route",
    });
  }
  try {
    // Find user with the email
    const userSavedInDb = await User.findOne({ email: microsoftAccount.mail });
    if (userSavedInDb) {
      req.user = userSavedInDb;
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const register = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const microsoftAccount = req.microsoftAccount!;
  const photoUrl = req.body.photoUrl;
  if (user) {
    return res.status(204).end();
  }
  if (!photoUrl) {
    return res.status(400).json({
      status: "special",
      message: "Required photoUrl to complete registration",
    });
  }
  try {
    const newUser = await User.create({
      email: microsoftAccount.mail,
      fullName: microsoftAccount.displayName,
      photoUrl,
    });
    return res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const checkIfTeacher = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user
  if (!user){
    return res.status(400).json({
      status: "error",
      msg: "This user does not have in database",
    });
  }
  if (user!.roles != "teacher") {
    return res.status(400).json({
      status: "error",
      msg: "This user does not have the permission to take action",
    });
  };
  return next();
}
