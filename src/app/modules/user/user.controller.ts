import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully !',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
};
