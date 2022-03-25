import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubmission extends Document {
  submissionTime: Date;
  content: string;
  testId: Types.ObjectId;
  studentId: Types.ObjectId;
}

const SubmissionSchema: Schema = new Schema({
  submissionTime: { type: Date, required: true, default: Date.now()},
  content: { type: String, required: true},
  testId: { type: Types.ObjectId, required: true, ref: "Test"},
  studentId: { type: Types.ObjectId, required: true, ref: "User"}
});

// Export the model and return your IUser interface
export default mongoose.model<ISubmission>('Submission', SubmissionSchema);