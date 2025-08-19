// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { pdfnoteControllers } from './pdfnote.controller';
import validateRequest from '../../middlewares/validateRequest';
import { pdfnoteValidation } from './pdfnote.validation';


// Initialize router
const router = Router();

router.post("/create-pdfnote",validateRequest(pdfnoteValidation.createPdfnoteSchema), pdfnoteControllers.createPdfnote);

const pdfnoteRoutes = router;
export default pdfnoteRoutes;