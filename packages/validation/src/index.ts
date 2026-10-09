import { z } from 'zod';

export const onboardTenantSchema = z.object({
  tenantName: z.string().min(1, "Tenant name is required"),
  slug: z.string().min(1, "Slug is required"),
  branchName: z.string().min(1, "Branch name is required"),
  branchSlug: z.string().min(1, "Branch slug is required"),
  adminName: z.string().min(1, "Admin name is required"),
  adminEmail: z.string().email("Invalid email address"),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type OnboardTenantInput = z.infer<typeof onboardTenantSchema>;
export * from './branch';
