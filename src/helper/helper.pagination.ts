type PaginationQuery = {
  page?: number | string;
  limit?: number | string;
  orderBy?: string;
  orderDirection?: string;
};

type PaginationResult = {
  page: number;
  skip: number;
  limit: number;
  orderByField: string;
  orderDirectionValue: string;
};
export const customPagination = (query: PaginationQuery): PaginationResult => {
  const { page = 1, limit = 10, orderBy, orderDirection } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const orderByField = orderBy || "createdAt";
  const orderDirectionValue = orderDirection || "desc";
  return { page: Number(page), skip, limit: Number(limit), orderByField, orderDirectionValue };
};
