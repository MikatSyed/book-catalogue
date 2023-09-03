'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const book_controller_1 = require('./book.controller');
const book_validate_1 = require('./book.validate');
const router = express_1.default.Router();
router.post(
  '/create-book',
  (0, validateRequest_1.default)(
    book_validate_1.BookValidation.createBookZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  book_controller_1.BookController.insertIntoDB
);
router.get('/', book_controller_1.BookController.getAllFromDB);
router.get(
  '/:categoryId/category',
  book_controller_1.BookController.getByCategoryIdFromDB
);
router.get('/:id', book_controller_1.BookController.getByIdFromDB);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    book_validate_1.BookValidation.updateBookZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  book_controller_1.BookController.updateOneInDB
);
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  book_controller_1.BookController.deleteByIdFromDB
);
exports.BookRoutes = router;
