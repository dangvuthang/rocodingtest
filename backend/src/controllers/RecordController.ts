import Record from '../models/Record';
import { Response} from 'express';
import {AuthRequest} from '../controllers/AuthController';

export const createRecord = async (req: AuthRequest, res: Response) => {
    let record;
    let {attendanceDate, numberOfCheats, evidence, userId, testId, submissionId} = req.body;
    userId = req.user!._id
    try {
      record =  await Record.create({attendanceDate, numberOfCheats, evidence, userId, testId, submissionId})
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
        record,
      },
    });
}
export const getRecordByTestId = async (req : AuthRequest, res : Response) => {
  let records;
  try {
    records =  await Record.find({testId: req.params.testId})
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
  if (!records) {
    return res.status(400).json({
      status: "error",
      msg: "There is no record found",
    });
  }
  return res.status(201).json({
    status: "success",
    data: {
      records,
    },
  });
}

export const getRecordByTestIdAndSubmissionId = async (req : AuthRequest, res : Response) => {
  let record;
  try {
    record =  await Record.find({testId: req.params.testId, submissionId: req.params.submissionId})
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
  if (!record) {
    return res.status(400).json({
      status: "error",
      msg: "There is no record found",
    });
  }
  return res.status(201).json({
    status: "success",
    data: {
      record,
    },
  });
}

export const getRecordByTestIdAndStudentId = async (req : AuthRequest, res : Response) => {
  let record;
  try {
    record =  await Record.find({testId: req.params.testId, userId: req.params.userId})
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
  if (!record) {
    return res.status(400).json({
      status: "error",
      msg: "There is no record found",
    });
  }
  return res.status(201).json({
    status: "success",
    data: {
      record,
    },
  });
}
