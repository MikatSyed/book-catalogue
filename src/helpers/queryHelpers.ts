type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string | undefined;
  sortOrder: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy;
  const sortOrder = options.sortOrder;
  const minPrice = Number(options.minPrice);
  const maxPrice = Number(options.maxPrice);

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  };
};

export const queryHelpers = {
  calculatePagination,
};
