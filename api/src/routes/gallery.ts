import { Router } from 'express';
import {getGallery, publishPhoto, removeMyPhoto, submitNewPhoto} from "../controllers/galleryController";
import {imagesUpload} from "../utils/multer";
import {authMiddleware} from "../middleware/authMiddleware";
import {permit} from "../middleware/roleMiddleware";

const router = Router();

router.get('/', getGallery);
router.post('/submit', authMiddleware, imagesUpload.single('image'), submitNewPhoto);
router.delete('/remove/:id', authMiddleware, removeMyPhoto);
router.delete('/publish/:id', authMiddleware, permit('ADMIN'), publishPhoto);

export default router;
