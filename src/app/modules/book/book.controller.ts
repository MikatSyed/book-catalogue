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

const getByCategoryIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const queryOptions = pick(req.query, queryFields);
  const result = await BookService.getByCategoryIdFromDB(
    categoryId,
    queryOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});
const updateOneInDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.updateOneInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getByCategoryIdFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
