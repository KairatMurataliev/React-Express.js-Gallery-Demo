import { Router } from 'express';
import {prisma} from "../../prisma/prisma-client";
import {getGallery} from "../controllers/galleryController"; // Импортируем middleware для проверки ролей

const router = Router();

router.get('/', getGallery);


export default router;
