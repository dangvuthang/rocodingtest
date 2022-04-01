import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface ITest {
    name: string;
    createdDate: Date;
    endDate: Date;
    link: string;
    duration: number;
    question: string;
    teacherId: Types.ObjectId;
  }

  const TestSchema: Schema = new Schema({
    name: {type: String, required: true},
    createdDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    link: {type: String, required: true},
    duration: {type: Number, required: true},
    question: {type: String, required: true},
    teacherId: {type: Schema.Types.ObjectId, ref: 'User'},
  });

  // Export the model and return your IUser interface
  export default mongoose.model<ITest>('Test', TestSchema);