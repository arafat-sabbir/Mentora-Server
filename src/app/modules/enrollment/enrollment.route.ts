// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { enrollmentControllers } from './enrollment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { enrollmentValidation } from './enrollment.validation';


// Initialize router
const router = Router();

router.post("/create-enrollment",validateRequest(enrollmentValidation.createEnrollmentSchema), enrollmentControllers.createEnrollment);

const enrollmentRoutes = router;
export default enrollmentRoutes;