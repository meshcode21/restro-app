// The exact staff auth provider is TBD per ADR-001/ARCHITECTURE.
// This is a placeholder boundary for authentication logic.

export type AuthContext = {
  userId?: string;
  organizationId?: string;
  role?: string;
};

export const verifyToken = async (token: string): Promise<AuthContext | null> => {
  // Placeholder implementation
  if (token === 'dev-token') {
    return {
      userId: 'dev-user',
      organizationId: 'dev-org',
      role: 'admin',
    };
  }
  return null;
};
