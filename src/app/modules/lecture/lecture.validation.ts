import mongoose from 'mongoose';
import { z } from 'zod';

// Validation Schema For createLecture
const createLectureSchema = z.object({
  params: z.object({
    moduleId: z.string({ required_error: 'Course ID is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Course ID must be a valid ObjectId',
      }
    ),
  }),
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title is required' }),
    videoUrl: z.string({ required_error: 'Video URL is required' }),
    moduleId: z.string({ required_error: 'Course ID is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Please Provide A Valid Course Id',
      }
    ),
    isActive: z.boolean({ required_error: 'IsActive is required' }).default(true),
  }),
});

const updateLectureSchema = z.object({
  params: z.object({
    lectureId: z.string({ required_error: 'Course ID is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Course ID must be a valid ObjectId',
      }
    ),
  }),
  body: z.object({
    title: z.string().optional(),
    videoUrl: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});
export const lectureValidation = {
  createLectureSchema,
  updateLectureSchema,
};

