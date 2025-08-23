import mongoose from 'mongoose';
import { z } from 'zod';

// Validation Schema For createUserProgress
const markNewProgressSchema = z.object({
  body: z.object({
    lectureId: z
      .string({ required_error: 'Lecture ID is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Please Provide A Valid Lecture Id',
      }),
    courseId: z
      .string({ required_error: 'Course ID is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Please Provide A Valid Course Id',
      }),
  }),
});

export const userProgressValidation = {
  markNewProgressSchema,
};
