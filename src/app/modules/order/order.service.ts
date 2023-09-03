/* @typescript-eslint/no-explicit-any */
import { Order, Role } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const postOrder = async (payload: any, userId: string): Promise<Order> => {
  const orderData = { ...payload };
  orderData.userId = userId as string;
  const result = await prisma.order.create({
    data: orderData,
  });
  return result;
};

const getALLOrderFromDB = async (
  userId: string,
  role: string
): Promise<Order[]> => {
  let result;
  if (role === Role.admin) {
    result = await prisma.order.findMany();
  }
  if (role === Role.customer) {
    result = await prisma.order.findMany({
      where: {
        userId,
      },
    });
  }
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Orders Not Found!');
  }
  return result;
};
const getOrderByIdFromDB = async (
  id: string,
  userId: string,
  role: string
): Promise<Order> => {
  let result;
  if (role === Role.admin) {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }
  if (role === Role.customer) {
    result = await prisma.order.findUnique({
      where: {
        id,
        ...(role === Role.customer && { userId }),
      },
    });
  }

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order Not Found!');
  }
  return result;
};

export const OrderService = {
  postOrder,
  getALLOrderFromDB,
  getOrderByIdFromDB,
};
