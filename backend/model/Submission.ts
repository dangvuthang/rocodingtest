import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubmission extends Document {
  email: string;
  submissionDate: Date;
  content: string;
  numberOfUnitsTestPassed: Number;
  testId: Types.ObjectId;
  studentId: Types.ObjectId;
}

const SubmissionSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  submissionDate: { type: Date, required: true},
  content: { type: String, required: true},
  numberOfUnitsTestPassed: { type: Number, required: true},
  testId: { type: Types.ObjectId, required: true, ref: "Test"},
  studentId: { type: Types.ObjectId, required: true, ref: "User"}
});

// Export the model and return your IUser interface
export default mongoose.model<ISubmission>('Submission', SubmissionSchema);