import mongoose, { Schema, Types } from "mongoose";

export interface IRecord {
  attendanceDate: Date;
  numberOfCheats: number;
  evidence: Types.Array<string>;
  userId: Types.ObjectId;
  testId: Types.ObjectId;
}

const RecordSchema: Schema = new Schema({
  attendanceDate: { type: Date, required: true, default: Date.now() },
  numberOfCheats: { type: Number, required: true, default: 0 },
  evidence: [{ type: String, required: true, default: [] }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  testId: { type: Schema.Types.ObjectId, ref: "Test" },
});

RecordSchema.index({ userId: 1, testId: 1 }, { unique: true });

// Export the model and return your IUser interface
export default mongoose.model<IRecord>("Record", RecordSchema);
