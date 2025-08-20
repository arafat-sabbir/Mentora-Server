// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { UserRoleEnum } from '../../constant/user';
import AuthorizeRequest from '../../middlewares/auth';
import { upload } from '../../utils/multer';
import convertFilePath from '../../utils/convertFilePath';

// Initialize router
const router = Router();

/**
 * @description Create A New Course
 * @param {string} path - '/api/course'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} validator - ['validateRequest(courseValidation.createCourseSchema)']
 * @param {function} controller - ['createCourse']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post(
  '/',
  AuthorizeRequest(UserRoleEnum.Admin),
  upload.single('thumbnail') as any,
  convertFilePath,
  (req, _, next) => {
    if (req) {
      req.body.thumbnail = req.file?.path;
      req.body = {
        ...req.body,
        thumbnail: req.file?.path,
        createdBy: req.user.id,
      };
    }
    next();
  },
  validateRequest(courseValidation.createCourseSchema),
  courseControllers.createCourse
);

/**
 * @description Get All Course
 * @param {string} path - '/api/course'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getAllCourse']
 * @returns {object} - router
 * @access public
 * @method POST
 */

router.get('/', AuthorizeRequest(UserRoleEnum.Admin), courseControllers.getAllCourse);

/**
 * @description Get All Course
 * @param {string} path - '/api/course'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getAllCourse']
 * @returns {object} - router
 * @access private
 * @method POST
 */

router.get('/', AuthorizeRequest(UserRoleEnum.Admin), courseControllers.getAllCourse);

/**
 * @description Get Single Course
 * @param {string} path - '/api/course/:id'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getSingleCourse']
 * @returns {object} - router
 * @access private
 * @method POST
 */

router.get('/:id', AuthorizeRequest(UserRoleEnum.Admin), courseControllers.getSingleCourse);

const courseRoutes = router;
export default courseRoutes;

