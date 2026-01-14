import { z } from 'zod';

/**
 * Schema for validating critical environment variables.
 * All variables listed here are required for the application to start.
 */
export const configValidationSchema = z.object({
  // Critical: Application port
  PORT: z.coerce
    .number()
    .int()
    .positive('PORT must be a positive integer')
    .describe('Application port number'),

  // Critical: Database connection URL
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required and cannot be empty')
    .url('DATABASE_URL must be a valid URL')
    .describe('PostgreSQL database connection URL'),

  // Critical: Redis connection URL (supports both URL format and host/port)
  REDIS_URL: z
    .string()
    .min(1, 'REDIS_URL is required and cannot be empty')
    .url('REDIS_URL must be a valid URL (e.g., redis://localhost:6379)')
    .describe('Redis connection URL'),

  // Critical: Node environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'], {
      errorMap: () => ({
        message: 'NODE_ENV must be one of: development, production, or test',
      }),
    })
    .describe('Node.js environment'),

  // Optional: Redis connection details (for backward compatibility)
  // These are only used if REDIS_URL is not provided
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.coerce.number().optional(),
  REDIS_PASSWORD: z.string().optional(),
});

export type ConfigValidationSchema = z.infer<typeof configValidationSchema>;

/**
 * Validates environment variables using Zod schema.
 * Throws an error with clear messages if validation fails.
 *
 * @param config - Environment variables to validate
 * @returns Validated configuration object
 * @throws Error if validation fails with detailed error messages
 */
export function validateConfig(config: Record<string, unknown>) {
  const result = configValidationSchema.safeParse(config);

  if (!result.success) {
    const errors = result.error.errors.map((error) => {
      const path = error.path.join('.');
      return `  - ${path}: ${error.message}`;
    });

    const errorMessage = [
      '❌ Configuration validation failed!',
      '',
      'Missing or invalid environment variables:',
      ...errors,
      '',
      'Please check your .env file and ensure all required variables are set.',
      '',
      'Required variables:',
      '  - PORT: Application port (e.g., 3000)',
      '  - DATABASE_URL: PostgreSQL connection URL',
      '  - REDIS_URL: Redis connection URL (e.g., redis://localhost:6379)',
      '  - NODE_ENV: Environment (development, production, or test)',
    ].join('\n');

    throw new Error(errorMessage);
  }

  return result.data;
}
