import Test from '../models/Test';
import { Request, Response } from 'express';
import  mongoose from 'mongoose';
import User from '../models/User';
import {AuthRequest} from '../controllers/AuthController';


export const checkIfTeacher = async (req: AuthRequest, res: Response) => {
  const id = req.user;
  let user;
  try {
    user = User.
    findById(id). // can also use find/findOne depending on your use-case
    populate({
      path: 'role',
      match: { name: 'teacher' }
    }).
    exec();
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
  if (!user) {
    return res.status(400).json({
      status: "error",
      msg: "This user does not have the permission to take action",
    });
  };
  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
}


export const getTest = async (req: Request, res: Response) => {
  const id = req.params.id;
  let test;
  try {
    test = await Test.findById(id);
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

  if (!test) {
    return res.status(400).json({
      status: "error",
      msg: "There is no test found in the database",
    });
  };
  return res.status(200).json({
    status: "success",
    data: {
      test,
    },
  });
}

export const getTestByUserAndId = async (req: Request, res: Response) => {
  let tests;
  try {
    tests = await Test.find({ _id: req.params.testId, teacherId: req.params.userId });
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

  if (!tests) {
    return res.status(400).json({
      status: "error",
      msg: "There is no test by this user",
    });
  };
  return res.status(200).json({
    status: "success",
    data: {
      tests,
    },
  });
}

export const createTest = async (req: Request, res: Response) => {
  const _id = new mongoose.Types.ObjectId();
  let { name, createdDate, endDate, link, duration, question, teacherId } = req.body;
  link = "http://localhost:3000/exams/" + _id;
  let test;
  try {
    test = await Test.create({ name, createdDate, endDate, link, duration, question, teacherId })
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
      test,
    },
  });
}

export const deleteTest = async (req: Request, res: Response) => {
  let test;
  try {
    test = await Test.findByIdAndDelete(req.params.id)
  } catch (err) {
    return res.status(400).json({
      errors: [
        {
          msg: err,
        },
      ],
    })
  }
  if (!test) {
    return res.status(400).json({
      errors: [
        {
          msg: "There is no test with that id",
        },
      ],
    });
  };
  return res.status(204).end();
};

export const updateTest = async (req: Request, res: Response) => {
  let test;
  try {
    test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
  } catch (err) {
    return res.status(400).json({
      errors: [
        {
          msg: err,
        },
      ],
    })
  }
  if (!test) {
    return res.status(400).json({
      errors: [
        {
          msg: "There is no test with that id",
        },
      ],
    });
  };
  return res.status(200).json({ 
    status: "success",
    data: {
      test,
    },
  });
};


