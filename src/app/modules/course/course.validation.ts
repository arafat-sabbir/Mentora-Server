import { z } from 'zod';

// Validation Schema For createCourse
const createCourseSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title is required' }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(1, { message: 'Description is required' }),
    price: z
      .string({ required_error: 'Price is required' })
      .refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      }, {
        message: 'Price must be a valid number greater than 0'
      }),
    thumbnail: z
      .string({ required_error: 'Thumbnail is required' })
      .min(1, { message: 'Thumbnail is required' }),
    createdBy: z.string({ required_error: 'CreatedBy is required' }),
    isActive: z.boolean({ required_error: 'IsActive is required' }).default(true),
  }),
});

export const courseValidation = {
  createCourseSchema,
};
