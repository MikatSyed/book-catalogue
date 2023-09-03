import { Status } from '@prisma/client';
import { z } from 'zod';

const postOrderSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'user Id is required',
        }),
        quantity: z
          .number({
            required_error: 'quantity is required',
          })
          .int()
          .min(1), // Validate as a positive integer
      })
    ),
    status: z
      .enum([...Object.values(Status)] as [string, ...string[]], {})
      .optional(),
  }),
});

export const OrderValidation = {
  postOrderSchema,
};
