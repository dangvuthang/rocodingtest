import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface IUnitTest extends Document {
    content: string;
    test_id: Types.ObjectId;
  }

  const UnitTestSchema: Schema = new Schema({
    content: {type: 'string', required: true},
    test_id: {type: Schema.Types.ObjectId,  ref: 'Test'}
  });

  // Export the model and return your IUser interface
  export default mongoose.model<IUnitTest>('UnitTest', UnitTestSchema);