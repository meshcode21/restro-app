import { Router, type IRouter } from 'express';
import { MenuController } from '../controllers/menu.controller';
import { requireTenant } from '../middlewares/tenant.middleware';

const router: IRouter = Router();

router.use(requireTenant as any);

router.get('/global/products', MenuController.listGlobalProducts as any);
router.get('/branch/:branchId/products', MenuController.listBranchProducts as any);

export default router;
