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
/**
 * @description Get All Public Course
 * @param {string} path - '/api/course/public'
 * @param {function} authorize - ['AuthorizeRequest()']
 * @param {function} controller - ['getAllCourse']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.post(
  '/',
  AuthorizeRequest(UserRoleEnum.Student),
  validateRequest(enrollmentValidation.createEnrollmentSchema),
  enrollmentControllers.enrollNewStudent
);

/**
 * @description Get All Public Course
 * @param {string} path - '/api/course/public'
 * @param {function} authorize - ['AuthorizeRequest()']
 * @param {function} controller - ['getAllCourse']
 * @returns {object} - router
 * @access public
 * @method GET
 */
router.get(
  '/student',
  AuthorizeRequest(UserRoleEnum.Student),
  enrollmentControllers.getAllStudentEnrollments
);

const enrollmentRoutes = router;
export default enrollmentRoutes;

