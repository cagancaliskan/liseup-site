import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';

export type DrizzleDB = NodePgDatabase<typeof schema>;

@Injectable()
export class PostgresProvider implements OnModuleDestroy {
  private readonly pool: Pool;
  private readonly logger = new Logger(PostgresProvider.name);
  public readonly db: DrizzleDB;

  constructor(private readonly config: ConfigService) {
    this.pool = new Pool({
      host: this.config.get<string>('DB_HOST', 'localhost'),
      port: this.config.get<number>('DB_PORT', 5432),
      database: this.config.get<string>('DB_NAME', 'liseup'),
      user: this.config.get<string>('DB_USER', 'postgres'),
      password: this.config.get<string>('DB_PASSWORD', ''),
      max: this.config.get<number>('DB_POOL_MAX', 20),
      idleTimeoutMillis: this.config.get<number>('DB_IDLE_TIMEOUT', 30000),
      connectionTimeoutMillis: this.config.get<number>('DB_CONN_TIMEOUT', 5000),
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected idle client error', err.stack);
    });

    this.db = drizzle(this.pool, { schema });
    this.logger.log('PostgreSQL + Drizzle initialized');
  }

  async transaction<T>(fn: (tx: DrizzleDB) => Promise<T>): Promise<T> {
    return this.db.transaction(fn);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
    this.logger.log('PostgreSQL connection pool closed');
  }
}
