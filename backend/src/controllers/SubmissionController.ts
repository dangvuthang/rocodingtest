import Submission from "../models/Submission";
import { Response } from "express";
import { AuthRequest } from "../controllers/AuthController";

export const getSubmissionByUserAndTestId = async (
  req: AuthRequest,
  res: Response
) => {
  let submissions;
  try {
    submissions = await Submission.find({
      studentId: req.params.id,
      testId: req.params.testId,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  if (!submissions) {
    return res.status(400).json({
      status: "error",
      msg: "There is no submission found",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      submissions,
    },
  });
};

export const getSubmissionByTestId = async (
  req: AuthRequest,
  res: Response
) => {
  let submissions;
  try {
    submissions = await Submission.find({ testId: req.params.testId });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  if (!submissions) {
    return res.status(400).json({
      status: "error",
      message: "There is no submission found",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      submissions,
    },
  });
};

export const createSubmission = async (req: AuthRequest, res: Response) => {
  let submission;
  try {
    submission = await Submission.create({
      content: req.body.content,
      testId: req.params.testId,
      studentId: req.user?._id,
      recordId: req.body.recordId,
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
      submission,
    },
  });
};

export const getAllTestSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await Submission.find({
      testId: req.params.testId,
    }).populate("studentId");
    res.status(200).json({
      status: "success",
      data: {
        submissions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getTestSubmissionDetail = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const submissions = await Submission.findById(
      req.params.submissionId
    ).populate(["studentId", "recordId"]);
    res.status(200).json({
      status: "success",
      data: {
        submissions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
