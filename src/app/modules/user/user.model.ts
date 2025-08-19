import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interface';
import { UserRoles } from '../../constant/user';
import bcrypt from 'bcrypt';

// User schema
const UserSchema: Schema<TUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, enum: UserRoles, default: 'student' },
  },
  { timestamps: true, versionKey: false }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create the User model
const UserModel = mongoose.model<TUser>('User', UserSchema);

// Export the User model
export default UserModel;
