import Submission from '../models/Submission';
import { Response} from 'express';
import {AuthRequest} from '../controllers/AuthController';


export const getSubmissionByUserAndTestId = async (req: AuthRequest, res: Response) => {
  let submissions;
  try {
    submissions = await Submission.find({studentId: req.params.id, testId: req.params.testId});
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errors: [
        {
          msg: err,
        },
      ],
    })
  }
  if (!submissions) {
        return res.status(400).json({
          status: "error",
          msg: "There is no submission found",
        });
    };
    return res.status(200).json({
      status: "success",
      data: {
        submissions,
      },
    });
}

export const getSubmissionByTestId = async (req: AuthRequest, res: Response) => {
  let submissions;
  try {
    submissions = await Submission.find({testId: req.params.testId})
  } catch (err) {
    return res.status(400).json({
      status: "error",
      errors: [
        {
          msg: err,
        },
      ],
    })
  }
  if (!submissions) {
        return res.status(400).json({
          status: "error",
          msg: "There is no submission found",
        });
    };
    return res.status(200).json({ 
      status: "success",
      data: {
        submissions,
      },
    });
}

export const createSubmission = async (req: AuthRequest, res: Response) => {
    let submission;
    let {submissionTime, content, testId, studentId} = req.body;
    studentId = req.user!._id
    try {
      submission =  await Submission.create({submissionTime, content, testId, studentId})
    } catch (err) {
      return res.status(400).json({
        status: "error",
        errors: [
          {
            msg: err,
          },
        ],
      })
    }
    return res.status(201).json({
      status: "success",
      data: {
        submission,
      },
    });
};