export const serverConfig = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export const clientConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
};
