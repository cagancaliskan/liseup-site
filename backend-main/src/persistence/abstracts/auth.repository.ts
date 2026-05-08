import { users, sessions } from '../schema';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export abstract class AuthRepository {
  // Users
  abstract findUserById(id: string): Promise<User | null>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract createUser(data: NewUser): Promise<User>;
  abstract updateUser(id: string, data: Partial<NewUser>): Promise<User | null>;
  abstract deleteUser(id: string): Promise<boolean>;

  // Sessions
  abstract findSessionById(id: string): Promise<Session | null>;
  abstract findSessionsByUserId(userId: string): Promise<Session[]>;
  abstract createSession(data: NewSession): Promise<Session>;
  abstract updateSession(id: string, data: Partial<NewSession>): Promise<Session | null>;
  abstract deleteSession(id: string): Promise<boolean>;
  abstract deleteSessionsByUserId(userId: string): Promise<number>;
  abstract deleteExpiredSessions(): Promise<number>;
}
