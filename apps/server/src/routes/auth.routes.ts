import { Router, type IRouter } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router: IRouter = Router();

// --- PLATFORM ADMIN AUTH ---
router.post('/platform/login', AuthController.loginPlatform);
router.post('/platform/logout', AuthController.logoutPlatform);

// --- ORGANIZATION AUTH ---
router.post('/tenant/login', AuthController.loginTenant);
router.post('/tenant/logout', AuthController.logoutTenant);
// router.get('/tenant/tenants', requireAuth, AuthController.getTenants);
// router.post('/tenant/tenants/select', requireAuth, AuthController.selectTenant);

export default router;
