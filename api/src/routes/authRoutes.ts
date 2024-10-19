import { Router } from 'express';
import {login, register, logout} from "../controllers/authController";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;
