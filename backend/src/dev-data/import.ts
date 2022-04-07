import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import User from "../models/User";
import Record from "../models/Record";
import Submission from "../models/Submission";
import Test from "../models/Test";
import users from "./users";
import tests from "./tests";
import records from "./records";
import submissions from "./submissions";
mongoose
  .connect(process.env.URI!)
  .then(() => console.log("CONNECT TO DATABASE"))
  .catch((e) => console.log(e));

const importData = async () => {
  try {
    await User.create(users, {
      validateBeforeSave: false,
    });
    await Submission.create(submissions, {
      validateBeforeSave: false,
    });
    await Test.create(tests, {
      validateBeforeSave: false,
    });
    await Record.create(records, {
      validateBeforeSave: false,
    });

    console.log("DATA SUCCESSFULLY INSERTED");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Submission.deleteMany();
    await Test.deleteMany();
    await Record.deleteMany();
    console.log("DATA SUCCESSFULLY DELETED");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();
