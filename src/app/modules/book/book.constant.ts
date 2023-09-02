export const bookFilterableFields = ['searchTerm', 'category'];
export const queryFields = [
  'limit',
  'page',
  'sortBy',
  'sortOrder',
  'minPrice',
  'maxPrice',
];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookRelationalFields = ['category'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
