import { z } from 'zod';
import { UserRoles } from '../../constant/user';

// Validation Schema For createUser
const registerSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    role: z.enum(UserRoles).default('student'),
  }),
});

export const userValidation = {
  registerSchema,
};

