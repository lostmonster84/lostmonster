import { neon } from '@neondatabase/serverless';

export function createClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return neon(databaseUrl);
}

// Helper for typed queries
export type SQL = ReturnType<typeof createClient>;
