import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import courseRoutes from '../modules/course/course.route';
import moduleRoutes from '../modules/module/module.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/modules',
    route: moduleRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

const allRoutes = router;
export default allRoutes;
