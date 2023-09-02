import { Book } from '@prisma/client';
import { queryHelpers } from '../../../helpers/queryHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
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
  const { page, limit, minPrice, maxPrice } =
    queryHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (
    minPrice !== undefined &&
    !isNaN(minPrice) &&
    maxPrice !== undefined &&
    !isNaN(maxPrice)
  ) {
    andConditions.push({
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    });
  } else if (minPrice !== undefined && !isNaN(minPrice)) {
    andConditions.push({
      price: {
        gte: minPrice,
      },
    });
  } else if (maxPrice !== undefined && !isNaN(maxPrice)) {
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

export const BookService = {
  insertIntoDB,
  getAllFromDB,
};
