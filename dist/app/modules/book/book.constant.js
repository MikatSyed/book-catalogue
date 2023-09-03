'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.bookRelationalFieldsMapper =
  exports.bookRelationalFields =
  exports.bookSearchableFields =
  exports.queryFields =
  exports.bookFilterableFields =
    void 0;
exports.bookFilterableFields = [
  'searchTerm',
  'category',
  'minPrice',
  'maxPrice',
];
exports.queryFields = ['limit', 'page', 'sortBy', 'sortOrder'];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFields = ['category'];
exports.bookRelationalFieldsMapper = {
  category: 'category',
};
