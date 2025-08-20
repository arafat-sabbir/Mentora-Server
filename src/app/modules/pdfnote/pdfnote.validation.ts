import mongoose from 'mongoose';
import { z } from 'zod';

// Validation Schema For createPdfnote
const createPdfnoteSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title is required' }),
    pdfUrl: z
      .string({ required_error: 'PDF URL is required' })
      .min(1, { message: 'PDF URL is required' }),
    lectureId: z.string({ required_error: 'Lecture ID is required' }).refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      {
        message: 'Please Provide A Valid Lecture Id',
      }
    ),
  }),
});

export const pdfnoteValidation = {
  createPdfnoteSchema,
};

