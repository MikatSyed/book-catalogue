import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';

const postOrder: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await OrderService.postOrder(req.body, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const getALLOrderFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getALLOrderFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  postOrder,
  getALLOrderFromDB,
};
