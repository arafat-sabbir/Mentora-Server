import { Types } from 'mongoose';

export interface TEnrollment {
  userId: Types.ObjectId; // reference to User
  courseId: Types.ObjectId; // reference to Course
  enrolledAt: Date;
  isActive: boolean;
  completedAt?: Date;
  progress: {
    completedLectures: number;
    totalLectures: number;
    percentage: number;
  };
  lastAccessedAt?: Date;
}

