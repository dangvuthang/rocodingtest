import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface ITest {
    name: string;
    createdDate: Date;
    endDate: Date;
    link: string;
    duration: number;
    question: string;
    teacherId: Types.ObjectId;
    submission: Types.Array<Types.ObjectId>;
  }

  const TestSchema: Schema = new Schema({
    name: {type: String, required: true},
    createdDate: {type: String, required: true},
    endDate: {type: String, required: true},
    link: {type: String, required: true},
    duration: {type: Number, required: true},
    question: {type: String, required: true},
    teacherId: {type: Schema.Types.ObjectId, ref: 'User'},
    submission: [{type: Schema.Types.ObjectId, ref : 'Submission'}]
  });

  // Export the model and return your IUser interface
  export default mongoose.model<ITest>('Test', TestSchema);