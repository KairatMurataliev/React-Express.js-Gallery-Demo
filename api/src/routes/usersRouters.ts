import { Router } from 'express';
import {toggleFavourite} from "../controllers/usersControllers";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.put('/toggleFavourite/:id', authMiddleware, toggleFavourite);

export default router;
