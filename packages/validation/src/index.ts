import { z } from 'zod';

export const onboardOrganizationSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  slug: z.string().min(1, "Slug is required"),
  adminName: z.string().min(1, "Admin name is required"),
  adminEmail: z.string().email("Invalid email address"),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type OnboardOrganizationInput = z.infer<typeof onboardOrganizationSchema>;
export * from './branch';
