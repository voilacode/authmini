/**
 * Environment variable validation
 * Ensures required variables are set before application starts
 */

/**
 * Required environment variables
 */
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];

/**
 * Validate that all required environment variables are set
 * @throws {Error} If any required variable is missing
 */
export function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}