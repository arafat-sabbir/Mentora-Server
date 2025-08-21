import mongoose, { Schema } from 'mongoose';
import { TEnrollment } from './enrollment.interface';

// Define an interface representing a Enrollment document

// Define the Enrollment schema
const EnrollmentSchema: Schema<TEnrollment> = new Schema({
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
  enrolledAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  completedAt: {
    type: Date,
    required: false,
  },
  progress: {
    completedLectures: {
      type: Number,
      required: true,
      default: 0,
    },
    totalLectures: {
      type: Number,
      required: true,
      default: 0,
    },
    percentage: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  lastAccessedAt: {
    type: Date,
    required: false,
  },
},{timestamps:true,versionKey:false});

// Create the Enrollment model
const EnrollmentModel = mongoose.model<TEnrollment>('Enrollment', EnrollmentSchema);

// Export the Enrollment model
export default EnrollmentModel;