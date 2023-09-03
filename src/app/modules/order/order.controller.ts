import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const postOrder: RequestHandler = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;

  const result = await OrderService.postOrder(req.body, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const getALLOrderFromDB: RequestHandler = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const role = req?.user?.role;
  const result = await OrderService.getALLOrderFromDB(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getOrderByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?.userId;
  const role = req?.user?.role;
  const result = await OrderService.getOrderByIdFromDB(id, userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  postOrder,
  getALLOrderFromDB,
  getOrderByIdFromDB,
};
