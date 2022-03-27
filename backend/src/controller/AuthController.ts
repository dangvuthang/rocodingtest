import User from '../models/User';
import {Request, Response} from 'express';
import UserController from './UserController';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {promisify} from "util";

dotenv.config()


export const signup =  async (req : Request, res : Response) => {
  const user = await UserController.createUser(req.body);
  return res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
};

export const login =  async (req : Request, res : Response) =>  {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({error : "No user was found"});
  return res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
};
/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export const checkIfLoginWithMicrosoft =  async (req : Request, res : Response) => {
    let token: string;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = req?.headers?.authorization?.split(" ")[1] as string;
    }
    if(token!){
        return res.status(401).json({error : "Please login again"});
    }
    const verifyAsPromise = promisify(jwt.verify);
    const decoded = await verifyAsPromise(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id);
    if (!user) return res.status(401).json({error : "User not found"});
    req?.user = user;
}


export default {
    login,
    signup,
    checkIfLoginWithMicrosoft,
  };