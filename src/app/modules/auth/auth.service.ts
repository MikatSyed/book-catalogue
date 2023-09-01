import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const sihgup = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};
export const AuthService = {
  sihgup,
};
