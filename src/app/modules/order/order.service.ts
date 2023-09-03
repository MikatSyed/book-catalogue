/* @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const postOrder = async (payload: any, user: any): Promise<Order> => {
  const orderData = { ...payload };

  orderData.userId = user.userId;
  const result = await prisma.order.create({
    data: orderData,
  });
  return result;
};

const getALLOrderFromDB = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany();
  return result;
};

export const OrderService = {
  postOrder,
  getALLOrderFromDB,
};
