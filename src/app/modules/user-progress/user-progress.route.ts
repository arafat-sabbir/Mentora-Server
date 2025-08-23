// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { userProgressControllers } from './user-progress.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userProgressValidation } from './user-progress.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { UserRoleEnum } from '../../constant/user';

// Initialize router
const router = Router();

router.post(
  '/complete',
  AuthorizeRequest(UserRoleEnum.Student),
  validateRequest(userProgressValidation.markNewProgressSchema),
  userProgressControllers.markNewProgress
);

const userProgressRoutes = router;
export default userProgressRoutes;
