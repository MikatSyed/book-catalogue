import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { bookFilterableFields, queryFields } from './book.constant';
import httpStatus from 'http-status';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, bookFilterableFields);
  const queryOptions = pick(req.query, queryFields);
  const result = await BookService.getAllFromDB(filters, queryOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
};
