export const bookFilterableFields = [
  'searchTerm',
  'category',
  'minPrice',
  'maxPrice',
];
export const queryFields = ['limit', 'page', 'sortBy', 'sortOrder'];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookRelationalFields = ['category'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
