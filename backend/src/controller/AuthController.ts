import User, { IUser } from '../models/User';
import express, { Express, Request, Response, Router } from 'express';
import UserController from './UserController';

export const signup =  (req : Request, res : Response) => {
  const user = await UserController.createUser(req.body);
  return res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
};

export const login =  (req : Request, res : Response) =>  {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({error : "No user was found"});
  return res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
};

// export const checkUser =  (req : Request, res : Response) =>  {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   )
//     token = req.headers.authorization.split(" ")[1];
//   if (!token)
//     return res.status(401).json({error : "Please login to access this route"});

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);
//   if (!token) return next(new AppError("User not found", 404));
//   req.user = user;
//   next();
// });


export default {
    login,
    signup,
  };