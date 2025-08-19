import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import { UserRoles } from '../../constant/user';

// User schema
const UserSchema: Schema<TUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: UserRoles, default: 'student' },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Create the User model
const UserModel = mongoose.model<TUser>('User', UserSchema);

// Export the User model
export default UserModel;

