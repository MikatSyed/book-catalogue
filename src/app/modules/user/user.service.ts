/* eslint-disable no-undef */
// @typescript-eslint/no-unused-vars

import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
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

const getByIdFromDB = async (id: string): Promise<IResponseUser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
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

const updateOneInDB = async (
  id: string,
  payload: Partial<User>
): Promise<IResponseUser> => {
  const { password, role, ...userData } = payload;
  const updatedUserData: Partial<User> = { ...userData };

  if (password) {
    const salt = await bcrypt.genSalt(Number(config.bycrypt_salt_rounds));
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedUserData.password = hashedPassword;
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: updatedUserData,
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
const deleteByIdFromDB = async (id: string): Promise<IResponseUser> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
