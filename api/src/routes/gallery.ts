import { Router } from 'express';
import {getGallery, submitNewPhoto} from "../controllers/galleryController";
import {imagesUpload} from "../utils/multer";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.get('/', getGallery);
router.post('/submit', authMiddleware, imagesUpload.single('image'), submitNewPhoto);

export default router;
