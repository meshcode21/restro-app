import { Router, type IRouter } from 'express';
import { SuperAdminController } from '../controllers/super-admin.controller';
import { requireSuperAdmin } from '../middlewares/auth.middleware';

const router: IRouter = Router();

// CODING_STANDARDS: route -> auth -> validation -> controller
router.post('/organizations', requireSuperAdmin, SuperAdminController.createOrganization);

export default router;
