import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface ITest extends Document {
    createdDate: Date;
    contents: string;
    testRoom: Types.ObjectId;
    unitTests: Types.Array<Types.ObjectId>;
  }

  const TestSchema: Schema = new Schema({
    createdDate: { type: Date},
    contents: { type: String, required: true},
    testRoom: { type: Types.ObjectId, ref: 'TestRoom'},
    unitTests: [{ type: Types.ObjectId, ref: 'UnitTest'}],
  });

  // Export the model and return your IUser interface
  export default mongoose.model<ITest>('Test', TestSchema);