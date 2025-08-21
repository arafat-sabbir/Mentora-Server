// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { userProgressControllers } from './user-progress.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userProgressValidation } from './user-progress.validation';

// Initialize router
const router = Router();

router.post(
  '/create-userProgress',
  validateRequest(userProgressValidation.createUserProgressSchema),
  userProgressControllers.createUserProgress
);

const userProgressRoutes = router;
export default userProgressRoutes;
