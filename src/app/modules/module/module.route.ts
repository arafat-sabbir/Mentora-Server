// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { moduleControllers } from './module.controller';
import validateRequest from '../../middlewares/validateRequest';
import { moduleValidation } from './module.validation';

// Initialize router
const router = Router();

router.post(
  '/:id',
  (req, res, next) => {
    req.body.courseId = req.params.id;
    next();
  },
  validateRequest(moduleValidation.createModuleSchema),
  moduleControllers.createModule
);

const moduleRoutes = router;
export default moduleRoutes;

