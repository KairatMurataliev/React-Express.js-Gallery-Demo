import { Router } from 'express';
import {getCategories, removeCategory} from "../controllers/categoriesController";
import {authMiddleware} from "../middleware/authMiddleware";
import {permit} from "../middleware/roleMiddleware";

const router = Router();

router.get('/', getCategories);
router.delete('/admin/remove/:id', authMiddleware, permit('ADMIN'), removeCategory);

export default router;
