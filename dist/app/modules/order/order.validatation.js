"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const postOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({
                required_error: 'user Id is required',
            }),
            quantity: zod_1.z
                .number({
                required_error: 'quantity is required',
            })
                .int()
                .min(1), // Validate as a positive integer
        })),
        status: zod_1.z
            .enum([...Object.values(client_1.Status)], {})
            .optional(),
    }),
});
exports.OrderValidation = {
    postOrderSchema,
};
