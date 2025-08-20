import { Types } from 'mongoose';

export interface TLecture {
  title: string;
  videoUrl: string; // YouTube embed URL or uploaded video path
  moduleId: Types.ObjectId; // reference to Module
  lectureNumber: number; // order within module
  isActive: boolean;
}

