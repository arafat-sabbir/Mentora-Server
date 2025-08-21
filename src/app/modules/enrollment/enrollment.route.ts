// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { enrollmentControllers } from './enrollment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { enrollmentValidation } from './enrollment.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { UserRoleEnum } from '../../constant/user';

// Initialize router
const router = Router();

router.post(
  '/',
  AuthorizeRequest(UserRoleEnum.Student),
  validateRequest(enrollmentValidation.createEnrollmentSchema),
  enrollmentControllers.enrollNewStudent
);

const enrollmentRoutes = router;
export default enrollmentRoutes;

