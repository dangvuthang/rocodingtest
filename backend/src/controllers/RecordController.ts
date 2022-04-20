import Record from "../models/Record";
import { Response } from "express";
import { AuthRequest } from "../controllers/AuthController";

export const createRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = await Record.create({
      userId: req.user!._id,
      testId: req.body.testId,
    });
    res.status(201).json({
      status: "success",
      data: {
        record,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const checkExistenceRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = await Record.findOne({
      userId: req.user!._id,
      testId: req.body.testId,
    });
    console.log(record);
    if (!record) {
      res.status(200).json({
        status: "allowed",
      });
    } else {
      res.status(400).json({
        status: "diallowed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = await Record.findById(req.params.id);
    if (record) {
      record.numberOfCheats++;
      record.evidence.push(req.body.evidence);
      await record.save();
      res.status(204).end();
    } else {
      res.status(404).json({
        status: "fail",
        message: "Not found current record",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
