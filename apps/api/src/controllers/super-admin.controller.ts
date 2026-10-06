import { Request, Response } from 'express';
import { onboardOrganizationSchema } from '@workspace/validation';
import { OrganizationService } from '../services/organization.service';

export class SuperAdminController {
  static async createOrganization(req: Request, res: Response) {
    try {
      // CODING_STANDARDS: input validation
      const parsed = onboardOrganizationSchema.parse(req.body);
      
      // CODING_STANDARDS: application/domain logic
      const result = await OrganizationService.onboardOrganization(parsed);
      
      // CODING_STANDARDS: consistent response envelopes
      res.status(201).json({ data: result });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: { code: 'VALIDATION_ERROR', message: 'Invalid request data', details: error.errors } 
        });
      }
      
      console.error('[SuperAdminController] Error:', error);
      res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } 
      });
    }
  }
}
