import { Response } from 'express';
import { MenuService } from '../services/menu.service';
import { TenantRequest } from '../middlewares/tenant.middleware';

export class MenuController {
  static async listGlobalProducts(req: TenantRequest, res: Response) {
    try {
      const organizationId = req.tenant!.organizationId;
      const products = await MenuService.listGlobalProducts(organizationId);
      res.status(200).json({ data: products });
    } catch (error: any) {
      console.error('[MenuController.listGlobalProducts] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async listBranchProducts(req: TenantRequest, res: Response) {
    try {
      const organizationId = req.tenant!.organizationId;
      const branchId = req.params.branchId as string;
      const products = await MenuService.listBranchProducts(organizationId, branchId);
      res.status(200).json({ data: products });
    } catch (error: any) {
      console.error('[MenuController.listBranchProducts] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }
}
