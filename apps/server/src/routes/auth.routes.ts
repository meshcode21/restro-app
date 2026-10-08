import { Router, type IRouter, type NextFunction, type Request, type Response } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router: IRouter = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    console.log("api/admin/login hit");
    next();
}, AuthController.loginAdmin);

router.post('/logout', AuthController.logoutAdmin);

export default router;
