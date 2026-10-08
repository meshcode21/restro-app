import { Router, type IRouter } from 'express';
import { SuperAdminController } from '../controllers/super-admin.controller';
import { requireSuperAdmin } from '../middlewares/auth.middleware';

const router: IRouter = Router();

// CODING_STANDARDS: route -> auth -> validation -> controller
router.get('/metrics', requireSuperAdmin, SuperAdminController.getMetrics);
router.get('/organizations', requireSuperAdmin, SuperAdminController.getOrganizations);
router.post('/organizations', requireSuperAdmin, SuperAdminController.createOrganization);
router.get('/subscriptions', requireSuperAdmin, SuperAdminController.getSubscriptions);
router.post('/organizations/:id/subscription/activate', requireSuperAdmin, SuperAdminController.activateSubscription);

export default router;
