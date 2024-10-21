import { Router } from 'express';
import {getGallery, removeMyPhoto, submitNewPhoto} from "../controllers/galleryController";
import {imagesUpload} from "../utils/multer";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.get('/', getGallery);
router.post('/submit', authMiddleware, imagesUpload.single('image'), submitNewPhoto);
router.delete('/remove/:id', authMiddleware, removeMyPhoto);

export default router;
