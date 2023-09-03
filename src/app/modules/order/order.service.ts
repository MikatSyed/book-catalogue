/* @typescript-eslint/no-explicit-any */
import { Order, Role } from '@prisma/client';
import prisma from '../../../shared/prisma';

const postOrder = async (payload: any, userId: string): Promise<Order> => {
  const orderData = { ...payload };

  orderData.userId = userId;
  const result = await prisma.order.create({
    data: orderData,
  });
  return result;
};

const getALLOrderFromDB = async (
  userId: string,
  role: string
): Promise<any> => {
  if (role === Role.admin) {
    const result = await prisma.order.findMany();
    return result;
  }
  if (role === Role.customer) {
    const result = await prisma.order.findMany({
      where: {
        userId,
      },
    });
    return result;
  }
};

const getALLOrderForSpacifcCustomer = async (
  userId: string
): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
  });
  return result;
};

export const OrderService = {
  postOrder,
  getALLOrderFromDB,
  getALLOrderForSpacifcCustomer,
};
