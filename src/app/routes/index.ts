import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import courseRoutes from '../modules/course/course.route';

const router = Router();

const routes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/course',
    route: courseRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

const allRoutes = router;
export default allRoutes;
