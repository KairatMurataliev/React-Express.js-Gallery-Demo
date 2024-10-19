import { Router } from 'express';
import {getCategories} from "../controllers/categoriesController"; // Импортируем middleware для проверки ролей

const router = Router();

router.get('/', getCategories);

export default router;
