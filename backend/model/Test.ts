import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface ITest extends Document {
    createdDate: Date;
    contents: string;
  }

  const TestSchema: Schema = new Schema({
    createdDate: { type: Date},
    contents: { type: String, required: true},
  });

  // Export the model and return your IUser interface
  export default mongoose.model<ITest>('Test', TestSchema);