import express from 'express';
import { UserController } from './user.controller';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router();

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
