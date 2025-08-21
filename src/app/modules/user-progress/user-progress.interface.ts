import { Types } from 'mongoose';

export interface TUserProgress {
  userId: Types.ObjectId; // reference to User
  courseId: Types.ObjectId; // reference to Course
  lectureId: Types.ObjectId; // reference to Lecture
  isCompleted: boolean;
  completedAt?: Date;
  watchTime?: number; // time watched in seconds
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
