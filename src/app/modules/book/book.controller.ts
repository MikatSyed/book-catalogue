import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
};
