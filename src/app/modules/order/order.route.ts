import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validatation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.postOrderSchema),
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.postOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getALLOrderFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrderByIdFromDB
);

export const OrderRoutes = router;
