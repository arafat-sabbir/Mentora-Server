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
 * @description Enroll a new Student
 * @param {string} path - '/api/enrollments'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Student)']
 * @param {function} controller - ['enrollNewStudent']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post(
  '/',
  AuthorizeRequest(UserRoleEnum.Student),
  validateRequest(enrollmentValidation.createEnrollmentSchema),
  enrollmentControllers.enrollNewStudent
);

/**
 * @description Get all enrollments for a student
 * @param {string} path - '/api/enrollments/student'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Student)']
 * @param {function} controller - ['getAllStudentEnrollments']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get(
  '/student',
  AuthorizeRequest(UserRoleEnum.Student),
  enrollmentControllers.getAllStudentEnrollments
);

/**
 * @description Get all enrollments for a student
 * @param {string} path - '/api/enrollments/student'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Student)']
 * @param {function} controller - ['getAllStudentEnrollments']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get(
  '/enrolled-courses/:courseId',
  AuthorizeRequest(UserRoleEnum.Student),
  validateRequest(enrollmentValidation.getEnrolledCourseContentSchema),
  enrollmentControllers.getEnrolledCourseContent
);

const enrollmentRoutes = router;
export default enrollmentRoutes;

