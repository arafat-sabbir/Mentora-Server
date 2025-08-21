import mongoose, { Schema } from 'mongoose';
import { TUserProgress } from './user-progress.interface';

// Define an interface representing a UserProgress document

// Define the UserProgress schema
const UserProgressSchema: Schema<TUserProgress> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    lectureId: {
      type: Schema.Types.ObjectId,
      ref: 'Lecture',
      required: true,
    },
    isCompleted: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    completedAt: {
      type: Schema.Types.Date,
      required: false,
    },
    watchTime: {
      type: Schema.Types.Number,
      required: false,
    },
    lastAccessedAt: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create the UserProgress model
const UserProgressModel = mongoose.model<TUserProgress>('UserProgress', UserProgressSchema);

// Export the UserProgress model
export default UserProgressModel;
