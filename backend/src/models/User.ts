import mongoose, { Schema } from 'mongoose';

export interface IUser {
    fullName: string;
    email: string;
    photoUrl: string;
    roles: string;
  }

  const UserSchema: Schema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    photoUrl: {type: String, required: true},
    role: {
      type: String,
      enum: {
        values: ["student", "teacher"],
        message: "Role must be student, or teacher",
      },
      default: "student",
    }
  });

  // Export the model and return your IUser interface
  export default mongoose.model<IUser>('User', UserSchema);