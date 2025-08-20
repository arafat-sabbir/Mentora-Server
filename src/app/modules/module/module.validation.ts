import mongoose from 'mongoose';
import { z } from 'zod';

// Validation Schema For createModule
const createModuleSchema = z.object({
  params: z.object({
    courseId: z.string({ required_error: 'Course ID is required' }).refine(
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
    courseId: z.string({ required_error: 'Course ID is required' }).refine(
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

const updateModuleSchema = z.object({
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
    title: z.string({ required_error: 'Title is required' }).optional(),
    isActive: z.boolean({ required_error: 'IsActive is required' }).optional(),
  }),
});
export const moduleValidation = {
  createModuleSchema,
  updateModuleSchema,
};

