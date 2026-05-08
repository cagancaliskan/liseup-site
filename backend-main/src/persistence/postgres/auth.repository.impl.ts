import { Injectable } from '@nestjs/common';
import { eq, lt } from 'drizzle-orm';
import { AuthRepository, User, NewUser, Session, NewSession } from '../abstracts';
import { PostgresProvider } from './postgres.provider';
import { users, sessions } from '../schema';

@Injectable()
export class PgAuthRepository extends AuthRepository {
  constructor(private readonly pg: PostgresProvider) {
    super();
  }

  private get db() {
    return this.pg.db;
  }

  // ─── Users ───────────────────────────────────────────

  async findUserById(id: string): Promise<User | null> {
    const rows = await this.db.select().from(users).where(eq(users.id, id));
    return rows[0] ?? null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const rows = await this.db.select().from(users).where(eq(users.email, email));
    return rows[0] ?? null;
  }

  async createUser(data: NewUser): Promise<User> {
    const rows = await this.db.insert(users).values(data).returning();
    return rows[0];
  }

  async updateUser(id: string, data: Partial<NewUser>): Promise<User | null> {
    const rows = await this.db.update(users).set(data).where(eq(users.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const rows = await this.db.delete(users).where(eq(users.id, id)).returning();
    return rows.length > 0;
  }

  // ─── Sessions ────────────────────────────────────────

  async findSessionById(id: string): Promise<Session | null> {
    const rows = await this.db.select().from(sessions).where(eq(sessions.id, id));
    return rows[0] ?? null;
  }

  async findSessionsByUserId(userId: string): Promise<Session[]> {
    return this.db.select().from(sessions).where(eq(sessions.user_id, userId));
  }

  async createSession(data: NewSession): Promise<Session> {
    const rows = await this.db.insert(sessions).values(data).returning();
    return rows[0];
  }

  async updateSession(id: string, data: Partial<NewSession>): Promise<Session | null> {
    const rows = await this.db.update(sessions).set(data).where(eq(sessions.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteSession(id: string): Promise<boolean> {
    const rows = await this.db.delete(sessions).where(eq(sessions.id, id)).returning();
    return rows.length > 0;
  }

  async deleteSessionsByUserId(userId: string): Promise<number> {
    const rows = await this.db.delete(sessions).where(eq(sessions.user_id, userId)).returning();
    return rows.length;
  }

  async deleteExpiredSessions(): Promise<number> {
    const rows = await this.db
      .delete(sessions)
      .where(lt(sessions.expires_at, new Date()))
      .returning();
    return rows.length;
  }
}
