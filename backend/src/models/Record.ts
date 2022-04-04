import mongoose, { Schema, Types } from 'mongoose';

export interface IRecord {
    attendanceDate: Date;
    numberOfCheats: number;
    evidence: Types.Array<string>;
    userId: Types.ObjectId;
    testId: Types.ObjectId;
    submissionId: Types.ObjectId;
  }

  const RecordSchema: Schema = new Schema({
    attendanceDate: { type: Date, required: true, unique: true },
    numberOfCheats: { type: Number, required: true, default: 0},
    evidence: [{ type: String, required: true, default: []}],
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    testId: { type: Schema.Types.ObjectId, ref: 'Test' },
    submissionId: { type: Schema.Types.ObjectId, ref: 'Submission' },
  });

  // Export the model and return your IUser interface
  export default mongoose.model<IRecord>('Record', RecordSchema);