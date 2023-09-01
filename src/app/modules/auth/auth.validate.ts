import { Role } from '@prisma/client';
import { z } from 'zod';

const signupZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...Object.values(Role)] as [string, ...string[]], {}),
    address: z.string({
      required_error: 'Address is required',
    }),
    contactNo: z.string({
      required_error: 'ContactNo is required',
    }),
    profileImg: z.string({
      required_error: 'ProfileImg is required',
    }),
  }),
});

export const AuthValidation = {
  signupZodSchema,
};
