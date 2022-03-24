import mongoose, { Schema, model, connect, Types } from 'mongoose';
import {ITest} from './Test';

export interface ITestRoom extends Document {
    name: string;
    description: string;
    createdDate: Date;
    endDate: Date;
    link: string;
    duration: number;
    tests: Types.Array<Types.ObjectId>;
  }

  const TestSchema: Schema = new Schema({
    name: {type: 'string', required: true},
    description: {type: 'string', required: true},
    createdDate: {type: 'string', required: true},
    endDate: {type: 'string', required: true},
    link: {type: 'string', required: true},
    duration: {type: 'string', required: true},
    tests: [{type: Schema.Types.ObjectId, ref: 'Test'}],
  });

  // Export the model and return your IUser interface
  export default mongoose.model<ITest>('Record', TestSchema);