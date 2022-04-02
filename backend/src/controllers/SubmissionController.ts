import Submission from '../models/Submission';
import {Request, Response} from 'express';

export const getSubmission = async (req: Request, res: Response) => {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test by this user",
            },
          ],
        });
    };
    return res.status(200).send(submission);
};

export const getSubmissionByUserAndTestId = async (req: Request, res: Response) => {
    const submissions = await Submission.find({studentId: req.params.id, testId: req.params.testId});
    if (!submissions) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test by this user",
            },
          ],
        });
    };
    return res.status(200).send(submissions);
}

export const getSubmissionByTestId = async (req: Request, res: Response) => {
    const submissions = await Submission.find({testId: req.params.testId})
    if (!submissions) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test by this user",
            },
          ],
        });
    };
    return res.status(200).send(submissions);
}

export const createSubmission = async (req: Request, res: Response) => {
    const {submissionTime, content, testId, studentId} = req.body;
    const submission =  await Submission.create({submissionTime, content, testId, studentId})
    return res.status(200).send(submission);
};