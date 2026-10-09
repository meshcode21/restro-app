import { Router, type IRouter, type NextFunction, type Request, type Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router: IRouter = Router();

// --- PLATFORM ADMIN AUTH ---
router.post('/admin/login', (req: Request, res: Response, next: NextFunction) => {
    console.log("api/auth/admin/login hit");
    next();
}, AuthController.loginAdmin);

router.post('/admin/logout', AuthController.logoutAdmin);

// --- ORGANIZATION AUTH ---
router.post('/org/login', AuthController.loginOrganization);
router.get('/org/organizations', requireAuth, AuthController.getOrganizations);
router.post('/org/organizations/select', requireAuth, AuthController.selectOrganization);
router.post('/org/logout', AuthController.logoutOrganization);

export default router;
