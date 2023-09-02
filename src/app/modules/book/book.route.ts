import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validate';

const router = express.Router();
router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);
router.get('/', BookController.getAllFromDB);

router.get('/:categoryId/category', BookController.getByCategoryIdFromDB);

router.get('/:id', BookController.getByIdFromDB);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteByIdFromDB
);

export const BookRoutes = router;
