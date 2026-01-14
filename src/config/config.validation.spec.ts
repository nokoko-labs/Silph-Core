import { describe, expect, it } from '@jest/globals';
import { validateConfig } from './config.validation';

describe('ConfigValidation', () => {
  it('should throw error when PORT is missing', () => {
    const config = {
      DATABASE_URL: 'postgresql://localhost:5432/test',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'development',
    };

    expect(() => validateConfig(config)).toThrow('PORT');
  });

  it('should throw error when DATABASE_URL is missing', () => {
    const config = {
      PORT: 3000,
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'development',
    };

    expect(() => validateConfig(config)).toThrow('DATABASE_URL');
  });

  it('should throw error when REDIS_URL is missing', () => {
    const config = {
      PORT: 3000,
      DATABASE_URL: 'postgresql://localhost:5432/test',
      NODE_ENV: 'development',
    };

    expect(() => validateConfig(config)).toThrow('REDIS_URL');
  });

  it('should throw error when NODE_ENV is missing', () => {
    const config = {
      PORT: 3000,
      DATABASE_URL: 'postgresql://localhost:5432/test',
      REDIS_URL: 'redis://localhost:6379',
    };

    expect(() => validateConfig(config)).toThrow('NODE_ENV');
  });

  it('should throw error when NODE_ENV is invalid', () => {
    const config = {
      PORT: 3000,
      DATABASE_URL: 'postgresql://localhost:5432/test',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'invalid',
    };

    expect(() => validateConfig(config)).toThrow('NODE_ENV');
  });

  it('should throw error when DATABASE_URL is invalid URL', () => {
    const config = {
      PORT: 3000,
      DATABASE_URL: 'not-a-url',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'development',
    };

    expect(() => validateConfig(config)).toThrow('DATABASE_URL');
  });

  it('should throw error when REDIS_URL is invalid URL', () => {
    const config = {
      PORT: 3000,
      DATABASE_URL: 'postgresql://localhost:5432/test',
      REDIS_URL: 'not-a-url',
      NODE_ENV: 'development',
    };

    expect(() => validateConfig(config)).toThrow('REDIS_URL');
  });

  it('should throw error when PORT is not a positive number', () => {
    const config = {
      PORT: -1,
      DATABASE_URL: 'postgresql://localhost:5432/test',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'development',
    };

    expect(() => validateConfig(config)).toThrow('PORT');
  });

  it('should validate successfully with all required variables', () => {
    const config = {
      PORT: 3000,
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/test',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'development',
    };

    const result = validateConfig(config);

    expect(result.PORT).toBe(3000);
    expect(result.DATABASE_URL).toBe('postgresql://user:pass@localhost:5432/test');
    expect(result.REDIS_URL).toBe('redis://localhost:6379');
    expect(result.NODE_ENV).toBe('development');
  });

  it('should validate successfully with production environment', () => {
    const config = {
      PORT: 8080,
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/prod',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'production',
    };

    const result = validateConfig(config);

    expect(result.NODE_ENV).toBe('production');
  });

  it('should validate successfully with test environment', () => {
    const config = {
      PORT: 3001,
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/test',
      REDIS_URL: 'redis://localhost:6379',
      NODE_ENV: 'test',
    };

    const result = validateConfig(config);

    expect(result.NODE_ENV).toBe('test');
  });

  it('should throw error with empty .env (empty object)', () => {
    const config = {};

    expect(() => validateConfig(config)).toThrow();
  });

  it('should throw error with empty strings for required variables', () => {
    const config = {
      PORT: '',
      DATABASE_URL: '',
      REDIS_URL: '',
      NODE_ENV: '',
    };

    expect(() => validateConfig(config)).toThrow();
  });
});
