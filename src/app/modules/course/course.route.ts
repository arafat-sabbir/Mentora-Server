// Import Router from express
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

router.post(
  '/',
  AuthorizeRequest(UserRoleEnum.Admin),
  upload.single('thumbnail'),
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

const courseRoutes = router;
export default courseRoutes;

