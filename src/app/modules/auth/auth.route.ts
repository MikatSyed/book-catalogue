import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validate';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signupZodSchema),
  AuthController.createUser
);
router.post(
  '/signin',
  // validateRequest(AuthValidation.signupZodSchema),
  AuthController.loginUser
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
