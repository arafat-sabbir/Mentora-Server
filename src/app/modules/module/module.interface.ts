import { Types } from 'mongoose';

export interface TModule {
  title: string;
  moduleNumber: number; // auto-increment per course
  courseId: Types.ObjectId; // reference to Course
  isActive: boolean;
}

