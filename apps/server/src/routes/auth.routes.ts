import { Router, type IRouter } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router: IRouter = Router();

// --- PLATFORM ADMIN AUTH ---
router.post('/platform/login', AuthController.loginPlatform);
router.post('/platform/logout', AuthController.logoutPlatform);

// --- ORGANIZATION AUTH ---
router.post('/org/login', AuthController.loginOrganization);
router.post('/org/logout', AuthController.logoutOrganization);
// router.get('/org/organizations', requireAuth, AuthController.getOrganizations);
// router.post('/org/organizations/select', requireAuth, AuthController.selectOrganization);

export default router;
