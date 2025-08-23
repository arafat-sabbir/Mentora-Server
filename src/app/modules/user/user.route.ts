// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { UserRoleEnum } from '../../constant/user';

// Initialize router
const router = Router();

router.post(
  '/signup',
  validateRequest(userValidation.registerSchema),
  userControllers.createUser
);

router.post('/signin', validateRequest(userValidation.loginSchema), userControllers.loginUser);

router.get('/me', AuthorizeRequest(UserRoleEnum.Student), userControllers.getCurrentUser);

const userRoutes = router;
export default userRoutes;
