import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    publicationDate: z.string({
      required_error: 'publication Date is required',
    }),
    categoryId: z.string({
      required_error: 'categoryId is required',
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
