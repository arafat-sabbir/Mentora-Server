// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { lectureControllers } from './lecture.controller';
import validateRequest from '../../middlewares/validateRequest';
import { lectureValidation } from './lecture.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { UserRoleEnum } from '../../constant/user';

// Initialize router
const router = Router();

/**
 * @description Create a new Lecture under a Module
 * @route POST /api/lectures/:moduleId
 * @access Private (Admin only)
 * @param {string} moduleId - Module ID
 */
router.post(
  '/:moduleId',
  (req, res, next) => {
    req.body.moduleId = req.params.moduleId;
    next();
  },
  validateRequest(lectureValidation.createLectureSchema),
  lectureControllers.createLecture
);

/**
 * @description Get all Lectures For Admin
 * @route GET /api/lectures
 * @access Private (Admin)
 */
router.get('/', AuthorizeRequest(UserRoleEnum.Admin), lectureControllers.getAllLecture);

/**
 * @description Get all Lectures by Module ID
 * @route GET /api/lectures/:moduleId
 * @access Private (Admin, Student)
 * @param {string} moduleId - Module ID
 */
router.get(
  '/:moduleId',
  AuthorizeRequest(UserRoleEnum.Admin, UserRoleEnum.Student),
  lectureControllers.getLectureByModule
);

/**
 * @description Update Lecture by ID
 * @route PUT /api/lectures/:lectureId
 * @access Private (Admin only)
 * @param {string} lectureId - Lecture ID
 */
router.put(
  '/:lectureId',
  AuthorizeRequest(UserRoleEnum.Admin),
  validateRequest(lectureValidation.updateLectureSchema),
  lectureControllers.updateLecture
);

/**
 * @description Delete Lecture by ID
 * @route DELETE /api/lectures/:lectureId
 * @access Private (Admin only)
 * @param {string} lectureId - Lecture ID
 */
router.delete(
  '/:lectureId',
  AuthorizeRequest(UserRoleEnum.Admin),
  lectureControllers.deleteLecture
);

const lectureRoutes = router;
export default lectureRoutes;

