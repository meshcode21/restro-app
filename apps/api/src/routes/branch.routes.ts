import { Router, type IRouter } from 'express';
import { BranchController } from '../controllers/branch.controller';
import { requireTenant } from '../middlewares/tenant.middleware';

const router: IRouter = Router();

router.use(requireTenant as any);

router.post('/', BranchController.createBranch as any);
router.get('/', BranchController.listBranches as any);

export default router;
