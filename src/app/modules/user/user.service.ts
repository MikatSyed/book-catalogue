/* eslint-disable no-undef */

import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IResponseUser } from './user.interface';

const getAllFromDB = async (): Promise<Partial<IResponseUser[]>> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
};
