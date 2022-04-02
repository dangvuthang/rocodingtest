import Test from '../models/Test';
import {Request, Response} from 'express';


export const getTest = async (req: Request, res: Response) => {
    const id = req.params.id;
    let test;
    try {
      test = await Test.findById(id);
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
              msg: "There is no test found in the database",
            },
          ],
        });
    };
    return res.status(200).send(test);
}

export const getTestByUserAndId = async (req: Request, res: Response) => {
  let tests;
  try {
    tests = await Test.find({_id: req.params.testId, teacherId: req.params.userId});
  } catch (err) {
    return res.status(400).json({
      errors: [
        {
          msg: err,
        },
      ],
    })
  }

  if (!tests) {
      return res.status(400).json({
        errors: [
          {
            msg: "There is no test by this user",
          },
        ],
      });
  };
  return res.status(200).send(tests);
}

export const createTest = async (req: Request, res: Response) => {
    const {name ,createdDate, endDate, link, duration, question, teacherId} = req.body;
    let test;
    try {
      test = await Test.create({name ,createdDate, endDate, link, duration, question, teacherId})
    } catch (err) {
      return res.status(400).json({
        errors: [
          {
            msg: err,
          },
        ],
      })
    }
    return res.status(200).send(test);
}

export const deleteTest = async (req: Request, res: Response) => {
    const test = Test.findByIdAndDelete(req.params.id)
    if (!test) {
        return res.status(400).json({
          errors: [
            {
              msg: "There is no test with that id",
            },
          ],
        });
    };
    return res.status(200).send(test);
};

export const updateTest = async (req: Request, res: Response) => {
    let test;
    try {
      test = await Test.findByIdAndUpdate(req.params.id, req.body, {new: true});
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
    return res.status(200).send(test);
};


