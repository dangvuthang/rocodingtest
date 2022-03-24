import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  email: string;
  submissionDate: Date;
  content: string;
  numberOfUnitsTestPassed: Number
}

const SubmissionSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  submissionDate: { type: Date, required: true},
  content: { type: String, required: true},
  numberOfUnitsTestPassed: { type: Number, required: true}
});

// Export the model and return your IUser interface
export default mongoose.model<ISubmission>('Submission', SubmissionSchema);