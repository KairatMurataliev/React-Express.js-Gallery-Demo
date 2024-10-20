import { Router } from 'express';
import {login, register, logout} from "../controllers/authController";
import {authMiddleware} from "../middleware/authMiddleware";
import {imagesUpload} from "../utils/multer";

const router = Router();

// router.post('/register', imagesUpload.single('avatar'), register);
// router.post('/login', login);
// router.delete('/logout', logout);

export default router;
