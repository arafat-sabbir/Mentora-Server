import { z } from 'zod';

// Validation Schema For createUserProgress
const createUserProgressSchema = z.object({
  body: z.object({}),
});

export const userProgressValidation = {
  createUserProgressSchema,
};
