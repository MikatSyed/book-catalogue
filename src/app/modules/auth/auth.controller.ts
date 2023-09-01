import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.sihgup(req.body);
  delete result.password;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User signin successfully!',
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User signin successfully',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
};
