import mongoose from 'mongoose';
import { z } from 'zod';

// Validation Schema For createEnrollment
const createEnrollmentSchema = z.object({
  body: z.object({
    courseId: z.string({ required_error: 'Course Id is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Please Provide A Valid Course Id',
      }
    ),
  }),
});

// Validation Schema For createEnrollment
const getEnrolledCourseContentSchema = z.object({
  params: z.object({
    courseId: z.string({ required_error: 'Course Id is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Please Provide A Valid Course Id',
      }
    ),
  }),
});

export const enrollmentValidation = {
  createEnrollmentSchema,
  getEnrolledCourseContentSchema,
};

