// @typescript-eslint/no-explicit-any
import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { queryHelpers } from '../../../helpers/queryHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
} from './book.constant';
import { IBookFilters } from './book.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IBookFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit } = queryHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
        { genre: { contains: searchTerm, mode: 'insensitive' } },
      ],
    });
  }
  if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
    andConditions.push({
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    });
  } else if (typeof minPrice === 'number') {
    andConditions.push({
      price: {
        gte: minPrice,
      },
    });
  } else if (typeof maxPrice === 'number') {
    andConditions.push({
      price: {
        lte: maxPrice,
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Get page and limit from options

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  // Calculate startIndex and endIndex for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the result array based on startIndex and endIndex
  const paginatedResult = result.slice(startIndex, endIndex);

  return {
    meta: {
      total,
      page,
      size: limit,
      totalPage,
    },
    data: paginatedResult, // Return paginated data
  };
};

const getByCategoryIdFromDB = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit } = queryHelpers.calculatePagination(options);

  const isCategoryExist = await prisma.book.findFirst({
    where: {
      categoryId,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: {
      category: {
        id: categoryId,
      },
    },
  });

  // Calculate the total number of pages
  const totalPage = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the result array based on startIndex and endIndex
  const paginatedResult = result.slice(startIndex, endIndex);
  return {
    meta: {
      total,
      page,
      size: limit,
      totalPage,
    },
    data: paginatedResult, // Return paginated data
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const isBookExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const isBookExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Book> => {
  const isBookExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }
  const result = await prisma.book.delete({
    where: {
      id,
    },

    include: {
      category: true,
    },
  });

  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByCategoryIdFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
