// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { userprogressControllers } from './userprogress.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userprogressValidation } from './userprogress.validation';


// Initialize router
const router = Router();

router.post("/create-userprogress",validateRequest(userprogressValidation.createUserprogressSchema), userprogressControllers.createUserprogress);

const userprogressRoutes = router;
export default userprogressRoutes;