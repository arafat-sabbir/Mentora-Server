import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import courseRoutes from '../modules/course/course.route';
import moduleRoutes from '../modules/module/module.route';
import lectureRoutes from '../modules/lecture/lecture.route';
import pdfnoteRoutes from '../modules/pdfnote/pdfnote.route';

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
  {
    path: '/lectures',
    route: lectureRoutes,
  },
  {
    path: '/pdfNotes',
    route: pdfnoteRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

const allRoutes = router;
export default allRoutes;
