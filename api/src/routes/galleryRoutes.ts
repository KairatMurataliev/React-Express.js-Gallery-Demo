import { Router } from 'express';
import {
  getAdminGallery,
  getGallery,
  togglePublish,
  removeMyPhoto,
  submitNewPhoto,
  getFavourites,
} from "../controllers/galleryController";
import {imagesUpload} from "../utils/multer";
import {authMiddleware} from "../middleware/authMiddleware";
import {permit} from "../middleware/roleMiddleware";

const router = Router();

router.get('/', getGallery);
router.get('/admin/get', authMiddleware, permit('ADMIN'), getAdminGallery);
router.post('/submit', authMiddleware, imagesUpload.single('image'), submitNewPhoto);
router.get('/favourites', authMiddleware, getFavourites);
router.delete('/remove/:id', authMiddleware, removeMyPhoto);
router.put('/admin/togglePublish/:id', authMiddleware, permit('ADMIN'), togglePublish);

export default router;
