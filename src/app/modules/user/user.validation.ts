import { z } from 'zod';
import { UserRoles } from '../../constant/user';

// Validation Schema For createUser
const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password should be at least 6 characters' }),
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(1, { message: 'First name is required' }),
    lastName: z
      .string({ required_error: 'Last name is required' })
      .min(1, { message: 'Last name is required' }),
    role: z.enum(UserRoles).default('student'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password should be at least 6 characters' }),
  }),
});

export const userValidation = {
  registerSchema,
  loginSchema
};
