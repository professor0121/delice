import express from 'express';
import userAuthMiddleware from '../middlewares/user.middleware.js';
import { roleAuthMiddleware } from '../middlewares/roleAuth.middleware.js';

import {
  getAllUser,
  getTypedUser,
  getBusinessRequestedUser,
  getAdvancedUsers,
  softDeleteUser
} from '../controllers/adminUser.controller.js';

const router = express.Router();

// GET all users
router.get(
  "/get-all-user",
  userAuthMiddleware,
  roleAuthMiddleware("Admin"),
  getAllUser
);

// GET users by accountType (Personal / Business / Admin)
router.post(
  "/get-typed-user",
  userAuthMiddleware,
  roleAuthMiddleware("Admin"),
  getTypedUser
);

// GET all users who requested business activation
router.get(
  "/get-business-requested-user",
  userAuthMiddleware,
  roleAuthMiddleware("Admin"),
  getBusinessRequestedUser
);

router.post(
  "/get-advanced-users",
  userAuthMiddleware,
  roleAuthMiddleware("Admin"),
  getAdvancedUsers
);

router.post(
  "/soft-delete-user",
  userAuthMiddleware,
  roleAuthMiddleware("Admin"),
  softDeleteUser
);

export default router;
