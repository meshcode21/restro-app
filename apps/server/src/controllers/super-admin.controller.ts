import { Request, Response } from 'express';
import { onboardOrganizationSchema } from '@workspace/validation';
import { OrganizationService } from '../services/organization.service';
import { db, organizations, subscriptions, platformMembers } from '@workspace/db';
import { count, eq } from 'drizzle-orm';

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

  static async getMetrics(req: Request, res: Response) {
    try {
      const [orgsCount] = await db.select({ value: count() }).from(organizations);
      const [subsCount] = await db.select({ value: count() }).from(subscriptions).where(eq(subscriptions.status, 'active'));
      const [membersCount] = await db.select({ value: count() }).from(platformMembers);

      res.status(200).json({
        totalOrganizations: orgsCount?.value ?? 0,
        activeSubscriptions: subsCount?.value ?? 0,
        totalPlatformMembers: membersCount?.value ?? 0,
      });
    } catch (error) {
      console.error('[SuperAdminController.getMetrics] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async getOrganizations(req: Request, res: Response) {
    try {
      const data = await db.select().from(organizations);
      res.status(200).json(data);
    } catch (error) {
      console.error('[SuperAdminController.getOrganizations] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  static async getSubscriptions(req: Request, res: Response) {
    try {
      const data = await db
        .select({
          id: subscriptions.id,
          organizationName: organizations.name,
          plan: subscriptions.plan,
          status: subscriptions.status,
          endsAt: subscriptions.endsAt,
        })
        .from(subscriptions)
        .leftJoin(organizations, eq(subscriptions.organizationId, organizations.id));

      res.status(200).json(data);
    } catch (error) {
      console.error('[SuperAdminController.getSubscriptions] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }
}
