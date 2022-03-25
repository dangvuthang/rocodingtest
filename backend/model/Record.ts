import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface IRecord {
    attendanceDate: Date;
    numberOfCheats: number;
    evidence: Types.Array<string>;
    userId: Types.ObjectId;
    testRoomId: Types.ObjectId;
  }

  const RecordSchema: Schema = new Schema({
    attendanceDate: { type: Date, required: true, unique: true },
    numberOfCheats: { type: Number, required: true, default: 0},
    evidence: [{ type: String, required: true, default: []}],
    userId: { type: Types.ObjectId, ref: 'User'},
    testRoomId: { type: Types.ObjectId, ref: 'TestRoom' },
  });

  // Export the model and return your IUser interface
  export default mongoose.model<IRecord>('Record', RecordSchema);