import mongoose, { Schema, Types } from "mongoose";

export interface ISubmission {
  submissionTime: Date;
  content: string;
  testId: Types.ObjectId;
  studentId: Types.ObjectId;
  recordId: Types.ObjectId;
}

const SubmissionSchema: Schema = new Schema({
  submissionTime: { type: Date, required: true, default: Date.now() },
  content: { type: String, required: true },
  testId: { type: Schema.Types.ObjectId, required: true, ref: "Test" },
  studentId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  recordId: { type: Schema.Types.ObjectId, required: true, ref: "Record" },
});

// Export the model and return your IUser interface
export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
