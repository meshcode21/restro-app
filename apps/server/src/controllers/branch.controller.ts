import { Response } from 'express';
import { createBranchSchema } from '@workspace/validation';
import { BranchService } from '../services/branch.service';
import { TenantRequest } from '../middlewares/tenant.middleware';

export class BranchController {
  static async createBranch(req: TenantRequest, res: Response) {
    try {
      const tenantId = req.tenant!.tenantId;
      const parsed = createBranchSchema.parse(req.body);
      
      const branch = await BranchService.createBranch(tenantId, parsed);
      
      res.status(201).json({ data: branch });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: { code: 'VALIDATION_ERROR', message: 'Invalid request data', details: error.errors } 
        });
      }
      console.error('[BranchController] Error:', error);
      res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } 
      });
    }
  }

  static async listBranches(req: TenantRequest, res: Response) {
    try {
      const tenantId = req.tenant!.tenantId;
      const userId = req.tenant!.userId;
      const role = req.tenant!.role;
      
      const results = await BranchService.listBranches(tenantId, userId, role);
      
      res.status(200).json({ data: results });
    } catch (error: any) {
      console.error('[BranchController] Error:', error);
      res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } 
      });
    }
  }
}
