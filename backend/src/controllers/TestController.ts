import Test from "../models/Test";
import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../controllers/AuthController";

export const getTest = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  let test;
  try {
    test = await Test.findById(id);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  if (!test) {
    return res.status(400).json({
      status: "error",
      msg: "There is no test found in the database",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      test,
    },
  });
};

export const getTestByUserAndId = async (req: AuthRequest, res: Response) => {
  let tests;
  try {
    tests = await Test.find({
      _id: req.params.testId,
      teacherId: req.params.userId,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errors: [
        {
          msg: err,
        },
      ],
    });
  }

  if (!tests) {
    return res.status(400).json({
      status: "error",
      msg: "There is no test by this user",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      tests,
    },
  });
};

export const createTest = async (req: AuthRequest, res: Response) => {
  const _id = new mongoose.Types.ObjectId();
  let { name, startedDate, endDate, link, duration, question, teacherId } =
    req.body;
  teacherId = req.user!._id;
  link = "http://localhost:3000/exam/" + _id;
  let test;
  try {
    test = await Test.create({
      _id,
      name,
      startedDate,
      endDate,
      link,
      duration,
      question,
      teacherId,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(201).json({
    status: "success",
    data: {
      test,
    },
  });
};

export const deleteTest = async (req: AuthRequest, res: Response) => {
  let test;
  try {
    test = await Test.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  if (!test) {
    return res.status(400).json({
      status: "error",
      message: "There is no test with that id",
    });
  }
  return res.status(204).end();
};

export const updateTest = async (req: AuthRequest, res: Response) => {
  let test;
  try {
    test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  if (!test) {
    return res.status(400).json({
      status: "error",
      message: "There is no test with that id",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      test,
    },
  });
};

export const getTestsByTeacherId = async (req: AuthRequest, res: Response) => {
  let teacherId = req.params.userId;
  if (!teacherId) {
    return res.status(400).json({
      status: "fail",
      message: "Required id to process",
    });
  }
  try {
    const tests = await Test.find({ teacherId });
    return res.status(200).json({
      status: "success",
      data: {
        tests,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
