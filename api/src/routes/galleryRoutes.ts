import { Router } from 'express';
import {
  getAdminGallery,
  getGallery,
  publishPhoto,
  removeMyPhoto,
  submitNewPhoto
} from "../controllers/galleryController";
import {imagesUpload} from "../utils/multer";
import {authMiddleware} from "../middleware/authMiddleware";
import {permit} from "../middleware/roleMiddleware";

const router = Router();

router.get('/', getGallery);
router.delete('/admin/get', authMiddleware, permit('ADMIN'), getAdminGallery);
router.post('/submit', authMiddleware, imagesUpload.single('image'), submitNewPhoto);
router.delete('/remove/:id', authMiddleware, removeMyPhoto);
router.post('/publish/:id', authMiddleware, permit('ADMIN'), publishPhoto);

export default router;
