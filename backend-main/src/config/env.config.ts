/**
 * Typed environment configuration with validation.
 * Used by ConfigModule.forRoot({ validate }) in AppModule.
 */
export interface AppEnv {
  // JWT
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  // Database
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_POOL_MAX: number;
  DB_IDLE_TIMEOUT: number;
  DB_CONN_TIMEOUT: number;
}

const required: (keyof AppEnv)[] = [
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
];

export function validate(config: Record<string, unknown>): AppEnv {
  const missing = required.filter((key) => !config[key] && config[key] !== 0);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }

  return {
    JWT_ACCESS_SECRET: String(config['JWT_ACCESS_SECRET']),
    JWT_REFRESH_SECRET: String(config['JWT_REFRESH_SECRET']),
    DB_HOST: String(config['DB_HOST'] ?? 'localhost'),
    DB_PORT: Number(config['DB_PORT'] ?? 5432),
    DB_NAME: String(config['DB_NAME'] ?? 'liseup'),
    DB_USER: String(config['DB_USER'] ?? 'postgres'),
    DB_PASSWORD: String(config['DB_PASSWORD'] ?? ''),
    DB_POOL_MAX: Number(config['DB_POOL_MAX'] ?? 20),
    DB_IDLE_TIMEOUT: Number(config['DB_IDLE_TIMEOUT'] ?? 30000),
    DB_CONN_TIMEOUT: Number(config['DB_CONN_TIMEOUT'] ?? 5000),
  };
}
