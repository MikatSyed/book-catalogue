import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      books: true,
    },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Category> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
