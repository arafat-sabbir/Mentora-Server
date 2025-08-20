import mongoose from 'mongoose';
import { z } from 'zod';

// Validation Schema For createModule
const createModuleSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title is required' }),
    courseId: z.string({ required_error: 'Course ID is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Course ID must be a valid ObjectId',
      }
    ),
    isActive: z.boolean({ required_error: 'IsActive is required' }).default(true),
  }),
});

export const moduleValidation = {
  createModuleSchema,
};
