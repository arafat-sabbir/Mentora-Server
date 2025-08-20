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
 * @description Create a new Lecture
 * @param {string} path - '/api/lectures/:id'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['createLecture']
 * @returns {object} - router
 * @access private
 * @method POST
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
 * @description Get Lectures by Module
 * @param {string} path - '/api/lectures/:moduleId'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getLectureByModule']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get(
  '/:moduleId',
  AuthorizeRequest(UserRoleEnum.Admin, UserRoleEnum.Student),
  lectureControllers.getLectureByModule
);

/**
 * @description Get Lecture by ID
 * @param {string} path - '/api/lectures/:id'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getLectureById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.put(
  '/:lectureId',
  AuthorizeRequest(UserRoleEnum.Admin),
  validateRequest(lectureValidation.updateLectureSchema),
  lectureControllers.updateLecture
);

/**
 * @description Delete Lecture by ID
 * @param {string} path - '/api/lectures/:id'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['deleteLecture']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete(
  '/:lectureId',
  AuthorizeRequest(UserRoleEnum.Admin),
  lectureControllers.deleteLecture
);

const lectureRoutes = router;
export default lectureRoutes;

