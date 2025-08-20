// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { moduleControllers } from './module.controller';
import validateRequest from '../../middlewares/validateRequest';
import { moduleValidation } from './module.validation';
import AuthorizeRequest from '../../middlewares/auth';
import { UserRoleEnum } from '../../constant/user';

// Initialize router
const router = Router();
/**
 * @description Create a new Module
 * @param {string} path - '/api/modules/:id'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['createModule']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post(
  '/:courseId',
  (req, res, next) => {
    req.body.courseId = req.params.courseId;
    next();
  },
  validateRequest(moduleValidation.createModuleSchema),
  moduleControllers.createModule
);

/**
 * @description Get Modules by Course
 * @param {string} path - '/api/modules/:courseId'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getModuleByCourse']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get(
  '/:courseId',
  AuthorizeRequest(UserRoleEnum.Admin, UserRoleEnum.Student),
  moduleControllers.getModuleByCourse
);

/**
 * @description Get Module by ID
 * @param {string} path - '/api/modules/:id'
 * @param {function} authorize - ['AuthorizeRequest(UserRoleEnum.Admin)']
 * @param {function} controller - ['getModuleById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.put(
  '/:moduleId',
  AuthorizeRequest(UserRoleEnum.Admin),
  validateRequest(moduleValidation.updateModuleSchema),
  moduleControllers.updateModule
);

const moduleRoutes = router;
export default moduleRoutes;

