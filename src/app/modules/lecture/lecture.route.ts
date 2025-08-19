// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { lectureControllers } from './lecture.controller';
import validateRequest from '../../middlewares/validateRequest';
import { lectureValidation } from './lecture.validation';


// Initialize router
const router = Router();

router.post("/create-lecture",validateRequest(lectureValidation.createLectureSchema), lectureControllers.createLecture);

const lectureRoutes = router;
export default lectureRoutes;