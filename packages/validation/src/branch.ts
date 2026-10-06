import { z } from 'zod';

export const createBranchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
});

export type CreateBranchInput = z.infer<typeof createBranchSchema>;
