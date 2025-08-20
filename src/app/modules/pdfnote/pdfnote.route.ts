// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { pdfnoteControllers } from './pdfnote.controller';
import validateRequest from '../../middlewares/validateRequest';
import { pdfnoteValidation } from './pdfnote.validation';
import { upload } from '../../utils/multer';
import convertFilePath from '../../utils/convertFilePath';
import AuthorizeRequest from '../../middlewares/auth';
import { UserRoleEnum } from '../../constant/user';

// Initialize router
const router = Router();

router.post(
  '/:lectureId',
  AuthorizeRequest(UserRoleEnum.Admin),
  upload.single('pdfUrl') as any,
  convertFilePath,
  (req, res, next) => {
    if (req) {
      req.body.lectureId = req.params.lectureId;
      req.body.pdfUrl = req?.file?.path;
      next();
    }
  },
  validateRequest(pdfnoteValidation.createPdfnoteSchema),
  pdfnoteControllers.createPdfnote
);

/**
 * @description Get all pdfNotes by lecture ID
 * @route GET /api/lectures/:lectureId
 * @access Private (Admin, Student)
 * @param {string} lectureId - lecture ID
 */
router.get(
  '/:lectureId',
  AuthorizeRequest(UserRoleEnum.Admin, UserRoleEnum.Student),
  pdfnoteControllers.getPdfNotesByLecture
);

const pdfnoteRoutes = router;
export default pdfnoteRoutes;

