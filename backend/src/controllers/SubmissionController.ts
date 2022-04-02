import Submission from '../models/Submission';
import {Request, Response} from 'express';

export const getSubmission = async (req: Request, res: Response) => {
  let submission;
  try {
    submission = await Submission.findById(req.params.id);
  } catch (err) {
      return res.status(400).json({
        errors: [
          {
            msg: err,
          },
        ],
      })
    }
    if (!submission) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test by this user",
            },
          ],
        });
    };
    return res.status(200).json({ 
      status: "success",
      data: {
        submission,
      },
    });
};

export const getSubmissionByUserAndTestId = async (req: Request, res: Response) => {
  let submissions;
  try {
    submissions = await Submission.find({studentId: req.params.id, testId: req.params.testId});
  } catch (err) {
    return res.status(400).json({
      errors: [
        {
          msg: err,
        },
      ],
    })
  }
  if (!submissions) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test by this user",
            },
          ],
        });
    };
    return res.status(200).json({
      status: "success",
      data: {
        submissions,
      },
    });
}

export const getSubmissionByTestId = async (req: Request, res: Response) => {
  let submissions;
  try {
    submissions = await Submission.find({testId: req.params.testId})
  } catch (err) {
    return res.status(400).json({
      errors: [
        {
          msg: err,
        },
      ],
    })
  }
  if (!submissions) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test by this user",
            },
          ],
        });
    };
    return res.status(200).json({ 
      status: "success",
      data: {
        submissions,
      },
    });
}

export const createSubmission = async (req: Request, res: Response) => {
    const {submissionTime, content, testId, studentId} = req.body;
    let submission;
    try {
      submission =  await Submission.create({submissionTime, content, testId, studentId})
    } catch (err) {
      return res.status(400).json({
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