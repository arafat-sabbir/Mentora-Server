// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';


// Initialize router
const router = Router();

router.post("/create-course",validateRequest(courseValidation.createCourseSchema), courseControllers.createCourse);

const courseRoutes = router;
export default courseRoutes;