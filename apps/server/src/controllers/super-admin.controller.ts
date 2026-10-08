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
          organizationId: subscriptions.organizationId,
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

  static async activateSubscription(req: Request, res: Response) {
    try {
      const orgId = req.params.id;
      if (!orgId || typeof orgId !== 'string') {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Organization ID is required' } });
      }
      
      const endsAt = new Date();
      endsAt.setDate(endsAt.getDate() + 30); // 30 days default

      const [updated] = await db
        .update(subscriptions)
        .set({
          status: 'active',
          endsAt,
        })
        .where(eq(subscriptions.organizationId, orgId))
        .returning();

      if (!updated) {
        return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Subscription not found for this organization' } });
      }

      res.status(200).json({ data: updated });
    } catch (error) {
      console.error('[SuperAdminController.activateSubscription] Error:', error);
      res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }
}
