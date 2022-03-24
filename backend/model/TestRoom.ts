import mongoose, { Schema, model, connect, Types } from 'mongoose';
import {ITest} from './Test';
import {IUser} from './User';

export interface ITestRoom extends Document {
    name: string;
    description: string;
    createdDate: Date;
    endDate: Date;
    link: string;
    duration: number;
    tests: Types.Array<Types.ObjectId>;
    studentsId: Types.Array<Types.ObjectId>;
    teacherId: Types.ObjectId;
  }

  const TestRoomSchema: Schema = new Schema({
    name: {type: 'string', required: true},
    description: {type: 'string', required: true},
    createdDate: {type: 'string', required: true},
    endDate: {type: 'string', required: true},
    link: {type: 'string', required: true},
    duration: {type: 'string', required: true},
    tests: [{type: Schema.Types.ObjectId, ref: 'Test'}],
    studentsId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    teacherId: {type: Schema.Types.ObjectId, ref: 'User'}
  });

  // Export the model and return your IUser interface
  export default mongoose.model<ITestRoom>('TestRoom', TestRoomSchema);