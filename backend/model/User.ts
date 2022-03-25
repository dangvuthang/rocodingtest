import mongoose, { Schema, model, connect, Types } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    email: string;
    photoUrl: string;
    roles: string;
  }

  const UserSchema: Schema = new Schema({
    fullName: {type: 'string', required: true},
    email: {type: 'string', required: true},
    photoUrl: {type: 'string', required: true},
     role: {
      type: String,
      enum: {
        values: ["student", "teacher"],
        message: "Role must be student, or teacher",
      },
      default: "user",
    }
  });

  // Export the model and return your IUser interface
  export default mongoose.model<IUser>('User', UserSchema);