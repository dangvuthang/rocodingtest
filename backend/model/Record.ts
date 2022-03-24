import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface IRecord extends Document {
    attendanceDate: string;
    numberOfCheats: Date;
    evidence: Types.Array<string>;
  }

  const RecordSchema: Schema = new Schema({
    attendanceDate: { type: String, required: true, unique: true },
    numberOfCheats: { type: Date, required: true},
    evidence: { type: String, required: true}
  });

  // Export the model and return your IUser interface
  export default mongoose.model<IRecord>('Record', RecordSchema);