# Backend Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the NestJS backend in `backend-main/` into the Next.js frontend, replacing stub auth with real JWT + PostgreSQL, adding `SchoolAdmin` role, scaffolding all five domain REST controllers, and migrating frontend session data from hardcoded mocks to JWT-decoded payload.

**Architecture:** NestJS runs on `:3001`. Next.js rewrites `/api/*` → `http://localhost:3001` for browser requests. Server Actions and middleware call NestJS directly via `BACKEND_INTERNAL_URL`. JWT access tokens live in `httpOnly` cookies (`liseup_at` 15m, `liseup_rt` 7d). The Next.js `middleware.ts` decodes access tokens locally with `jose`. Client components read session data from React Context populated by async server layouts.

**Tech Stack:** NestJS 11 · Drizzle ORM · PostgreSQL · bcrypt · ULID · jose 5 · Next.js 16 · TypeScript 5 · React 19

**Spec:** `docs/superpowers/specs/2026-05-08-backend-integration-design.md`

---

## File Map

### Backend — create
| File | Responsibility |
|---|---|
| `backend-main/src/education/education.module.ts` | Declares `EducationController` |
| `backend-main/src/education/education.controller.ts` | CRUD for schools, students, mentors, categories |
| `backend-main/src/teams/teams.module.ts` | Declares `TeamsController` |
| `backend-main/src/teams/teams.controller.ts` | CRUD for teams, members, projects |
| `backend-main/src/commerce/commerce.module.ts` | Declares `CommerceController` |
| `backend-main/src/commerce/commerce.controller.ts` | CRUD for vendors, products, cart, transactions |
| `backend-main/src/messaging/messaging.module.ts` | Declares `MessagingController` |
| `backend-main/src/messaging/messaging.controller.ts` | CRUD for messages |
| `backend-main/src/seed.ts` | Idempotent demo-user seed (one user per role + one school) |
| `backend-main/.env` | Runtime config (copy `.env.example`, fill real values) |

### Backend — modify
| File | Change |
|---|---|
| `backend-main/src/entities/role.ts` | Add `SchoolAdmin = 4` |
| `backend-main/src/auth/roles/role-hierarchy.ts` | Add SchoolAdmin to hierarchy |
| `backend-main/src/auth/auth.module.ts` | Add `@Global()`, add/export `AuthGuard` |
| `backend-main/src/auth/auth.service.ts` | Inject `AuthRepository`, real DB sign-in |
| `backend-main/src/auth/store/session.store.ts` | Fix `findSession` to look up user for role + email |
| `backend-main/src/app.module.ts` | Import 4 new feature modules |

### Frontend — create
| File | Responsibility |
|---|---|
| `liseup_web/middleware.ts` | JWT decode, role-gating, transparent token refresh |
| `liseup_web/lib/session-context.tsx` | `SessionProvider` + `useSession()` hook |
| `liseup_web/lib/api-client.ts` | Typed server-side `apiFetch` helper |
| `liseup_web/lib/api/education.ts` | Typed wrappers for `/api/education/*` |
| `liseup_web/lib/api/teams.ts` | Typed wrappers for `/api/teams/*` |
| `liseup_web/lib/api/commerce.ts` | Typed wrappers for `/api/commerce/*` |
| `liseup_web/lib/api/messaging.ts` | Typed wrappers for `/api/messaging/*` |
| `liseup_web/.env.local` | `BACKEND_INTERNAL_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` |

### Frontend — modify
| File | Change |
|---|---|
| `liseup_web/package.json` | Add `jose` |
| `liseup_web/next.config.ts` | Add `/api/*` rewrite |
| `liseup_web/lib/auth-actions.ts` | Real sign-in / sign-out / quickLoginAs |
| `liseup_web/lib/session.ts` | Async getters from `x-user-payload` header; `UserPayload` type |
| `liseup_web/app/app/layout.tsx` | Async, reads header, wraps with `SessionProvider` |
| `liseup_web/app/okul/layout.tsx` | Same |
| `liseup_web/app/kurum/layout.tsx` | Same |
| `liseup_web/app/yonetim/layout.tsx` | Same |
| `liseup_web/components/app/user-menu.tsx` | `useSession()` |
| `liseup_web/components/app/app-sidebar.tsx` | `useSession()` |
| `liseup_web/components/admin/admin-sidebar.tsx` | `useSession()` |
| `liseup_web/components/admin/admin-user-menu.tsx` | `useSession()` |
| `liseup_web/components/kurum/kurum-sidebar.tsx` | `useSession()` |
| `liseup_web/components/kurum/kurum-user-menu.tsx` | `useSession()` |
| `liseup_web/components/okul/okul-sidebar.tsx` | `useSession()` |
| `liseup_web/components/okul/okul-user-menu.tsx` | `useSession()` |
| `liseup_web/app/app/page.tsx` | `async`, `await getSession()` |
| `liseup_web/app/app/profil/page.tsx` | `async`, `await getSession()` |
| `liseup_web/app/app/okul-baglanti/page.tsx` | `async`, `await getSession()` |
| `liseup_web/app/kurum/page.tsx` | `async`, `await getKurumSession()` |
| `liseup_web/app/kurum/profil/page.tsx` | `async`, `await getKurumSession()` |
| `liseup_web/app/kurum/abonelik/page.tsx` | `async`, `await getKurumSession()` |
| `liseup_web/app/okul/page.tsx` | `async`, `await getOkulSession()` |
| `liseup_web/app/okul/partner-ayricaliklar/page.tsx` | `async`, `await getOkulSession()` |

### Frontend — delete
| File | Reason |
|---|---|
| `liseup_web/proxy.ts` | Replaced by `middleware.ts` |

---

## Task 1: SchoolAdmin role enum + hierarchy

**Files:**
- Modify: `backend-main/src/entities/role.ts`
- Modify: `backend-main/src/auth/roles/role-hierarchy.ts`
- Create: `backend-main/src/auth/roles/role-hierarchy.spec.ts`

- [ ] **Step 1.1: Write failing test**

```bash
# From backend-main/
cat > src/auth/roles/role-hierarchy.spec.ts << 'EOF'
import { Role } from '../../entities/role';
import { canAccess, satisfiesAny } from './role-hierarchy';

describe('role-hierarchy with SchoolAdmin', () => {
  it('Admin satisfies SchoolAdmin routes', () => {
    expect(canAccess(Role.Admin, Role.SchoolAdmin)).toBe(true);
  });
  it('SchoolAdmin satisfies only SchoolAdmin routes', () => {
    expect(canAccess(Role.SchoolAdmin, Role.SchoolAdmin)).toBe(true);
    expect(canAccess(Role.SchoolAdmin, Role.User)).toBe(false);
    expect(canAccess(Role.SchoolAdmin, Role.Admin)).toBe(false);
    expect(canAccess(Role.SchoolAdmin, Role.Vendor)).toBe(false);
  });
  it('satisfiesAny returns true when any required role is satisfied', () => {
    expect(satisfiesAny(Role.Admin, [Role.SchoolAdmin, Role.Vendor])).toBe(true);
    expect(satisfiesAny(Role.SchoolAdmin, [Role.SchoolAdmin, Role.Vendor])).toBe(true);
    expect(satisfiesAny(Role.User, [Role.SchoolAdmin, Role.Vendor])).toBe(false);
  });
});
EOF
```

- [ ] **Step 1.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=role-hierarchy.spec
```
Expected: FAIL — `Role.SchoolAdmin` not defined.

- [ ] **Step 1.3: Add SchoolAdmin to Role enum**

Replace `backend-main/src/entities/role.ts` with:

```typescript
export enum Role {
  User        = 0,
  Mentor      = 1,
  Vendor      = 2,
  Admin       = 3,
  SchoolAdmin = 4,
}
```

- [ ] **Step 1.4: Update role hierarchy**

Replace `backend-main/src/auth/roles/role-hierarchy.ts` with:

```typescript
import { Role } from '../../entities/role';

export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  [Role.Admin]:       [Role.Admin, Role.Mentor, Role.Vendor, Role.User, Role.SchoolAdmin],
  [Role.Mentor]:      [Role.Mentor],
  [Role.Vendor]:      [Role.Vendor],
  [Role.User]:        [Role.User],
  [Role.SchoolAdmin]: [Role.SchoolAdmin],
};

export function canAccess(userRole: Role, requiredRole: Role): boolean {
  return (ROLE_HIERARCHY[userRole] ?? [userRole]).includes(requiredRole);
}

export function satisfiesAny(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.some((required) => canAccess(userRole, required));
}
```

- [ ] **Step 1.5: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=role-hierarchy.spec
```
Expected: PASS — 3 tests pass.

- [ ] **Step 1.6: Commit**

```bash
git add backend-main/src/entities/role.ts backend-main/src/auth/roles/role-hierarchy.ts backend-main/src/auth/roles/role-hierarchy.spec.ts
git commit -m "feat(backend): add SchoolAdmin role and update hierarchy

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Fix session.store.ts findSession bug

The existing `findSession` hardcodes `role: 0` and empty name/email, meaning refresh tokens regenerate with wrong data.

**Files:**
- Modify: `backend-main/src/auth/store/session.store.ts`
- Create: `backend-main/src/auth/store/session.store.spec.ts`

- [ ] **Step 2.1: Write failing test**

```bash
cat > backend-main/src/auth/store/session.store.spec.ts << 'EOF'
import { SessionStore } from './session.store';
import { AuthRepository } from '../../persistence';
import { Role } from '../../entities/role';

const mockAuthRepo = {
  findSessionById: jest.fn(),
  findUserById: jest.fn(),
  createSession: jest.fn(),
  updateSession: jest.fn(),
  deleteSession: jest.fn(),
  deleteSessionsByUserId: jest.fn(),
  deleteExpiredSessions: jest.fn(),
  findUserByEmail: jest.fn(),
  findSessionsByUserId: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
} as unknown as jest.Mocked<AuthRepository>;

describe('SessionStore.findSession', () => {
  let store: SessionStore;

  beforeEach(() => {
    jest.clearAllMocks();
    store = new SessionStore(mockAuthRepo);
  });

  it('returns null when session not found', async () => {
    mockAuthRepo.findSessionById.mockResolvedValue(null);
    expect(await store.findSession('missing')).toBeNull();
  });

  it('returns null when user not found', async () => {
    mockAuthRepo.findSessionById.mockResolvedValue({
      id: 'sess-1', user_id: 'usr-1', user_agent: 'agent',
      refresh_token: 'hash', expires_at: new Date(),
    });
    mockAuthRepo.findUserById.mockResolvedValue(null);
    expect(await store.findSession('sess-1')).toBeNull();
  });

  it('populates role and email from user row', async () => {
    mockAuthRepo.findSessionById.mockResolvedValue({
      id: 'sess-1', user_id: 'usr-1', user_agent: 'agent',
      refresh_token: 'hash', expires_at: new Date(Date.now() + 60000),
    });
    mockAuthRepo.findUserById.mockResolvedValue({
      id: 'usr-1', email: 'test@example.com', password: 'hashed',
      role: Role.Vendor, status: 0,
      email_verification_code: null, new_email: null,
    });
    const record = await store.findSession('sess-1');
    expect(record).not.toBeNull();
    expect(record!.userPayload.role).toBe(Role.Vendor);
    expect(record!.userPayload.userEmail).toBe('test@example.com');
  });
});
EOF
```

- [ ] **Step 2.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=session.store.spec
```
Expected: FAIL — role is 0, email is empty string.

- [ ] **Step 2.3: Fix SessionStore.findSession**

Replace `backend-main/src/auth/store/session.store.ts` with:

```typescript
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserPayload, SessionRecord } from '../entities/user.payload';
import { AuthRepository } from '../../persistence';
import { Role } from '../../entities/role';

@Injectable()
export class SessionStore {
  constructor(private readonly authRepo: AuthRepository) {}

  async saveSession(payload: UserPayload, refreshToken: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(refreshToken, salt);

    const existing = await this.authRepo.findSessionById(payload.sessionId);
    if (existing) {
      await this.authRepo.updateSession(payload.sessionId, { refresh_token: hash });
    } else {
      await this.authRepo.createSession({
        id: payload.sessionId,
        user_id: payload.userId,
        user_agent: payload.devices[0]?.deviceName ?? 'Unknown',
        refresh_token: hash,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
  }

  async findSession(sessionId: string): Promise<SessionRecord | null> {
    const session = await this.authRepo.findSessionById(sessionId);
    if (!session) return null;

    const user = await this.authRepo.findUserById(session.user_id);
    if (!user) return null;

    return {
      tokenHash: session.refresh_token,
      userPayload: {
        userId: session.user_id,
        sessionId: session.id,
        userName: user.email,
        userEmail: user.email,
        role: user.role as Role,
        rolePayload: {},
        devices: [],
      },
      expiresAt: session.expires_at ?? new Date(),
    };
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    return this.authRepo.deleteSession(sessionId);
  }

  async deleteUserSessions(userId: string): Promise<number> {
    return this.authRepo.deleteSessionsByUserId(userId);
  }
}
```

- [ ] **Step 2.4: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=session.store.spec
```
Expected: PASS — 3 tests pass.

- [ ] **Step 2.5: Commit**

```bash
git add backend-main/src/auth/store/session.store.ts backend-main/src/auth/store/session.store.spec.ts
git commit -m "fix(backend): populate role and email from user row in findSession

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Make AuthModule global and export AuthGuard

**Files:**
- Modify: `backend-main/src/auth/auth.module.ts`

- [ ] **Step 3.1: Update auth.module.ts**

Replace `backend-main/src/auth/auth.module.ts` with:

```typescript
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionService } from './providers/SessionService';
import { SessionStore } from './store/session.store';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          algorithm: 'HS512',
          expiresIn: '15m',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionService, SessionStore, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
```

- [ ] **Step 3.2: Type-check backend**

```bash
cd backend-main && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3.3: Commit**

```bash
git add backend-main/src/auth/auth.module.ts
git commit -m "feat(backend): make AuthModule global and export AuthGuard

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Replace stub signIn with real DB auth

**Files:**
- Modify: `backend-main/src/auth/auth.service.ts`
- Create: `backend-main/src/auth/auth.service.spec.ts`

- [ ] **Step 4.1: Write failing test**

```bash
cat > backend-main/src/auth/auth.service.spec.ts << 'EOF'
import { AuthService } from './auth.service';
import { AuthRepository } from '../persistence';
import { Role } from '../entities/role';
import * as bcrypt from 'bcrypt';

const mockJwtService = { signAsync: jest.fn(), verifyAsync: jest.fn() };
const mockConfig = { get: jest.fn().mockReturnValue('secret') };
const mockSessionService = { createSession: jest.fn(), refreshSession: jest.fn() };
const mockAuthRepo = {
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  findSessionById: jest.fn(),
  findSessionsByUserId: jest.fn(),
  createSession: jest.fn(),
  updateSession: jest.fn(),
  deleteSession: jest.fn(),
  deleteSessionsByUserId: jest.fn(),
  deleteExpiredSessions: jest.fn(),
} as unknown as jest.Mocked<AuthRepository>;

describe('AuthService.signIn', () => {
  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(
      mockJwtService as any,
      mockSessionService as any,
      mockConfig as any,
      mockAuthRepo,
    );
  });

  it('returns null for unknown email', async () => {
    mockAuthRepo.findUserByEmail.mockResolvedValue(null);
    expect(await service.signIn('unknown@test.com', 'pass', 'agent')).toBeNull();
  });

  it('returns null for wrong password', async () => {
    const hash = await bcrypt.hash('correct', 1);
    mockAuthRepo.findUserByEmail.mockResolvedValue({
      id: 'u1', email: 'user@test.com', password: hash,
      role: 0, status: 0, email_verification_code: null, new_email: null,
    });
    expect(await service.signIn('user@test.com', 'wrong', 'agent')).toBeNull();
  });

  it('returns session tokens for valid credentials', async () => {
    const hash = await bcrypt.hash('pass123', 1);
    mockAuthRepo.findUserByEmail.mockResolvedValue({
      id: 'u1', email: 'user@test.com', password: hash,
      role: Role.User, status: 0, email_verification_code: null, new_email: null,
    });
    mockSessionService.createSession.mockResolvedValue({
      user: { userId: 'u1' }, accessToken: 'at', refreshToken: 'rt',
    });
    const result = await service.signIn('user@test.com', 'pass123', 'agent');
    expect(result).toHaveProperty('accessToken', 'at');
    expect(result).toHaveProperty('refreshToken', 'rt');
    expect(mockSessionService.createSession).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'u1', email: 'user@test.com' }),
      expect.objectContaining({ name: 'agent' }),
      Role.User,
    );
  });
});
EOF
```

- [ ] **Step 4.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=auth.service.spec
```
Expected: FAIL — AuthService constructor doesn't accept 4th argument.

- [ ] **Step 4.3: Implement real signIn**

Replace `backend-main/src/auth/auth.service.ts` with:

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Role } from '../entities/role';
import { UserPayload } from './entities/user.payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './providers/SessionService';
import { satisfiesAny } from './roles/role-hierarchy';
import { AuthRepository } from '../persistence';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly config: ConfigService,
    private readonly authRepo: AuthRepository,
  ) {}

  async validateUser(roles: Role[], token: string): Promise<UserPayload | null> {
    const payload: UserPayload = await this.jwtService.verifyAsync(token, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
    });
    if (!roles || roles.length === 0) return payload;
    return satisfiesAny(payload.role, roles) ? payload : null;
  }

  async signIn(username: string, password: string, userAgent: string): Promise<any> {
    const user = await this.authRepo.findUserByEmail(username);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    const deviceInfo = { name: userAgent, ip: '127.0.0.1', deviceId: null };
    return this.sessionService.createSession(
      { id: user.id, name: user.email, email: user.email },
      deviceInfo,
      user.role as Role,
    );
  }
}
```

- [ ] **Step 4.4: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=auth.service.spec
```
Expected: PASS — 3 tests pass.

- [ ] **Step 4.5: Commit**

```bash
git add backend-main/src/auth/auth.service.ts backend-main/src/auth/auth.service.spec.ts
git commit -m "feat(backend): replace stub signIn with real DB lookup + bcrypt

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Demo user seed script

**Files:**
- Create: `backend-main/src/seed.ts`
- Create: `backend-main/.env` (from `.env.example`)

- [ ] **Step 5.1: Create .env**

```bash
cd backend-main && cp .env.example .env
```

Then edit `backend-main/.env` — fill in real values:

```
JWT_ACCESS_SECRET=liseup_access_secret_dev
JWT_REFRESH_SECRET=liseup_refresh_secret_dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=liseup
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_POOL_MAX=20
DB_IDLE_TIMEOUT=30000
DB_CONN_TIMEOUT=5000
PORT=3001
```

> **Prerequisite:** PostgreSQL must be running and a database named `liseup` must exist:
> ```bash
> createdb liseup
> ```
> Push the schema:
> ```bash
> cd backend-main && npm run db:push
> ```

- [ ] **Step 5.2: Create seed script**

Create `backend-main/src/seed.ts`:

```typescript
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from './persistence/schema';
import * as bcrypt from 'bcrypt';
import { ulid } from 'ulid';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  const pool = new Pool({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME ?? 'liseup',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
  });

  const db = drizzle(pool, { schema });
  const hash = await bcrypt.hash('demo123', 10);

  const demoUsers = [
    { id: ulid(), email: 'demo-liseli@liseup.org', password: hash, role: 0 as const },
    { id: ulid(), email: 'demo-kurum@liseup.org',  password: hash, role: 2 as const },
    { id: ulid(), email: 'demo-yonetim@liseup.org', password: hash, role: 3 as const },
    { id: ulid(), email: 'demo-okul@liseup.org',   password: hash, role: 4 as const },
  ];

  for (const user of demoUsers) {
    const existing = await db.select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.email, user.email));
    if (existing.length === 0) {
      await db.insert(schema.users).values({
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        status: 0,
      });
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`Skipped (exists): ${user.email}`);
    }
  }

  // Seed demo school for the okul user
  const okulUser = await db.select().from(schema.users)
    .where(eq(schema.users.email, 'demo-okul@liseup.org'));

  if (okulUser[0]) {
    const existingSchool = await db.select({ id: schema.schools.id })
      .from(schema.schools)
      .where(eq(schema.schools.admin_id, okulUser[0].id));
    if (existingSchool.length === 0) {
      await db.insert(schema.schools).values({
        id: ulid(),
        admin_id: okulUser[0].id,
        name: 'Ankara Atatürk Lisesi',
        city: 'Ankara',
        type: 0,
      });
      console.log('Created demo school');
    } else {
      console.log('Skipped (exists): demo school');
    }
  }

  console.log('Seed complete.');
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 5.3: Run seed**

```bash
cd backend-main && npx ts-node -r tsconfig-paths/register src/seed.ts
```
Expected output:
```
Created user: demo-liseli@liseup.org
Created user: demo-kurum@liseup.org
Created user: demo-yonetim@liseup.org
Created user: demo-okul@liseup.org
Created demo school
Seed complete.
```

- [ ] **Step 5.4: Commit**

```bash
git add backend-main/src/seed.ts
git commit -m "feat(backend): add idempotent demo user seed script

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Education module + controller

**Files:**
- Create: `backend-main/src/education/education.module.ts`
- Create: `backend-main/src/education/education.controller.ts`
- Create: `backend-main/src/education/education.controller.spec.ts`

- [ ] **Step 6.1: Write failing test**

Create `backend-main/src/education/education.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { EducationController } from './education.controller';
import { EducationRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo: jest.Mocked<EducationRepository> = {
  findSchoolById: jest.fn(),
  findSchoolsByCity: jest.fn(),
  createSchool: jest.fn(),
  updateSchool: jest.fn(),
  deleteSchool: jest.fn(),
  findStudentByUserId: jest.fn(),
  findStudentsBySchoolId: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
  findMentorByUserId: jest.fn(),
  findMentorsByExpertise: jest.fn(),
  createMentor: jest.fn(),
  updateMentor: jest.fn(),
  deleteMentor: jest.fn(),
  findAllCategories: jest.fn(),
  createCategory: jest.fn(),
  deleteCategory: jest.fn(),
} as unknown as jest.Mocked<EducationRepository>;

describe('EducationController', () => {
  let controller: EducationController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
      providers: [{ provide: EducationRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<EducationController>(EducationController);
  });

  it('findSchoolById delegates to repository', async () => {
    const school = { id: 's1', admin_id: 'u1', name: 'Test', city: 'Ankara', type: 0 };
    mockRepo.findSchoolById.mockResolvedValue(school);
    expect(await controller.findSchoolById('s1')).toEqual(school);
    expect(mockRepo.findSchoolById).toHaveBeenCalledWith('s1');
  });

  it('findAllCategories delegates to repository', async () => {
    mockRepo.findAllCategories.mockResolvedValue([{ id: 1, name: 'Tech' }]);
    const result = await controller.findAllCategories();
    expect(result).toEqual([{ id: 1, name: 'Tech' }]);
  });
});
```

- [ ] **Step 6.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=education.controller.spec
```
Expected: FAIL — `EducationController` not found.

- [ ] **Step 6.3: Create education.controller.ts**

Create `backend-main/src/education/education.controller.ts`:

```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { EducationRepository, NewSchool, NewStudent } from '../persistence';

@Controller('/api/education')
export class EducationController {
  constructor(private readonly education: EducationRepository) {}

  @Get('schools/:id')
  @Auth()
  findSchoolById(@Param('id') id: string) {
    return this.education.findSchoolById(id);
  }

  @Get('schools')
  @Auth()
  findSchoolsByCity(@Query('city') city: string) {
    return this.education.findSchoolsByCity(city);
  }

  @Post('schools')
  @Auth(Role.Admin)
  createSchool(@Body() body: NewSchool) {
    return this.education.createSchool(body);
  }

  @Patch('schools/:id')
  @Auth(Role.Admin, Role.SchoolAdmin)
  updateSchool(@Param('id') id: string, @Body() body: Partial<NewSchool>) {
    return this.education.updateSchool(id, body);
  }

  @Delete('schools/:id')
  @Auth(Role.Admin)
  deleteSchool(@Param('id') id: string) {
    return this.education.deleteSchool(id);
  }

  @Get('students/:userId')
  @Auth()
  findStudentByUserId(@Param('userId') userId: string) {
    return this.education.findStudentByUserId(userId);
  }

  @Get('students')
  @Auth(Role.SchoolAdmin, Role.Admin)
  findStudentsBySchoolId(@Query('schoolId') schoolId: string) {
    return this.education.findStudentsBySchoolId(schoolId);
  }

  @Post('students')
  @Auth(Role.Admin)
  createStudent(@Body() body: NewStudent) {
    return this.education.createStudent(body);
  }

  @Patch('students/:userId')
  @Auth(Role.Admin)
  updateStudent(@Param('userId') userId: string, @Body() body: Partial<NewStudent>) {
    return this.education.updateStudent(userId, body);
  }

  @Get('mentors/:userId')
  @Auth()
  findMentorByUserId(@Param('userId') userId: string) {
    return this.education.findMentorByUserId(userId);
  }

  @Get('categories')
  findAllCategories() {
    return this.education.findAllCategories();
  }
}
```

- [ ] **Step 6.4: Create education.module.ts**

Create `backend-main/src/education/education.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';

@Module({
  controllers: [EducationController],
})
export class EducationModule {}
```

- [ ] **Step 6.5: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=education.controller.spec
```
Expected: PASS — 2 tests pass.

- [ ] **Step 6.6: Commit**

```bash
git add backend-main/src/education/
git commit -m "feat(backend): add EducationController with schools/students/mentors/categories endpoints

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 7: Teams module + controller

**Files:**
- Create: `backend-main/src/teams/teams.module.ts`
- Create: `backend-main/src/teams/teams.controller.ts`
- Create: `backend-main/src/teams/teams.controller.spec.ts`

- [ ] **Step 7.1: Write failing test**

Create `backend-main/src/teams/teams.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo: jest.Mocked<TeamsRepository> = {
  findTeamById: jest.fn(),
  findTeamsByOwnerId: jest.fn(),
  createTeam: jest.fn(),
  updateTeam: jest.fn(),
  deleteTeam: jest.fn(),
  findMembersByTeamId: jest.fn(),
  findMembershipsByUserId: jest.fn(),
  addMember: jest.fn(),
  updateMemberStatus: jest.fn(),
  removeMember: jest.fn(),
  findProjectById: jest.fn(),
  findProjectsByTeamId: jest.fn(),
  findProjectsByMentorId: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
} as unknown as jest.Mocked<TeamsRepository>;

describe('TeamsController', () => {
  let controller: TeamsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [{ provide: TeamsRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<TeamsController>(TeamsController);
  });

  it('findTeamById delegates to repository', async () => {
    const team = { id: 't1', owner_id: 'u1', name: 'Dream Team' };
    mockRepo.findTeamById.mockResolvedValue(team);
    expect(await controller.findTeamById('t1')).toEqual(team);
    expect(mockRepo.findTeamById).toHaveBeenCalledWith('t1');
  });

  it('findProjectById delegates to repository', async () => {
    mockRepo.findProjectById.mockResolvedValue(null);
    expect(await controller.findProjectById('p1')).toBeNull();
  });
});
```

- [ ] **Step 7.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=teams.controller.spec
```
Expected: FAIL — `TeamsController` not found.

- [ ] **Step 7.3: Create teams.controller.ts**

Create `backend-main/src/teams/teams.controller.ts`:

```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { TeamsRepository, NewTeam, NewTeamMember, NewProject } from '../persistence';

@Controller('/api/teams')
export class TeamsController {
  constructor(private readonly teams: TeamsRepository) {}

  @Get('teams/:id')
  @Auth()
  findTeamById(@Param('id') id: string) {
    return this.teams.findTeamById(id);
  }

  @Post('teams')
  @Auth(Role.User, Role.Mentor)
  createTeam(@Body() body: NewTeam) {
    return this.teams.createTeam(body);
  }

  @Patch('teams/:id')
  @Auth(Role.User, Role.Mentor, Role.Admin)
  updateTeam(@Param('id') id: string, @Body() body: Partial<NewTeam>) {
    return this.teams.updateTeam(id, body);
  }

  @Delete('teams/:id')
  @Auth(Role.Admin)
  deleteTeam(@Param('id') id: string) {
    return this.teams.deleteTeam(id);
  }

  @Get('teams/:id/members')
  @Auth()
  findMembersByTeamId(@Param('id') id: string) {
    return this.teams.findMembersByTeamId(id);
  }

  @Post('teams/:id/members')
  @Auth(Role.User, Role.Mentor, Role.Admin)
  addMember(@Param('id') teamId: string, @Body() body: Omit<NewTeamMember, 'team_id'>) {
    return this.teams.addMember({ ...body, team_id: teamId });
  }

  @Patch('teams/:teamId/members/:userId')
  @Auth(Role.User, Role.Mentor, Role.Admin)
  updateMemberStatus(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @Body('status') status: number,
  ) {
    return this.teams.updateMemberStatus(userId, teamId, status);
  }

  @Delete('teams/:teamId/members/:userId')
  @Auth(Role.User, Role.Mentor, Role.Admin)
  removeMember(@Param('teamId') teamId: string, @Param('userId') userId: string) {
    return this.teams.removeMember(userId, teamId);
  }

  @Get('projects/:id')
  @Auth()
  findProjectById(@Param('id') id: string) {
    return this.teams.findProjectById(id);
  }

  @Post('projects')
  @Auth(Role.User, Role.Mentor)
  createProject(@Body() body: NewProject) {
    return this.teams.createProject(body);
  }

  @Patch('projects/:id')
  @Auth(Role.User, Role.Mentor, Role.Admin)
  updateProject(@Param('id') id: string, @Body() body: Partial<NewProject>) {
    return this.teams.updateProject(id, body);
  }

  @Delete('projects/:id')
  @Auth(Role.Admin)
  deleteProject(@Param('id') id: string) {
    return this.teams.deleteProject(id);
  }
}
```

- [ ] **Step 7.4: Create teams.module.ts**

Create `backend-main/src/teams/teams.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';

@Module({
  controllers: [TeamsController],
})
export class TeamsModule {}
```

- [ ] **Step 7.5: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=teams.controller.spec
```
Expected: PASS — 2 tests pass.

- [ ] **Step 7.6: Commit**

```bash
git add backend-main/src/teams/
git commit -m "feat(backend): add TeamsController with teams/members/projects endpoints

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 8: Commerce module + controller

**Files:**
- Create: `backend-main/src/commerce/commerce.module.ts`
- Create: `backend-main/src/commerce/commerce.controller.ts`
- Create: `backend-main/src/commerce/commerce.controller.spec.ts`

- [ ] **Step 8.1: Write failing test**

Create `backend-main/src/commerce/commerce.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CommerceController } from './commerce.controller';
import { CommerceRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo: jest.Mocked<CommerceRepository> = {
  findVendorById: jest.fn(),
  findVendorsByManagerId: jest.fn(),
  createVendor: jest.fn(),
  updateVendor: jest.fn(),
  deleteVendor: jest.fn(),
  findProductById: jest.fn(),
  findProductsByVendorId: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  findCartByUserId: jest.fn(),
  addToCart: jest.fn(),
  updateCartItem: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  findTransactionById: jest.fn(),
  findTransactionsByUserId: jest.fn(),
  findTransactionsByTeamId: jest.fn(),
  createTransaction: jest.fn(),
} as unknown as jest.Mocked<CommerceRepository>;

describe('CommerceController', () => {
  let controller: CommerceController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommerceController],
      providers: [{ provide: CommerceRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<CommerceController>(CommerceController);
  });

  it('findVendorById delegates to repository', async () => {
    const vendor = { id: 'v1', manager_id: 'u1', name: 'ACME', logo: null, categories: [] };
    mockRepo.findVendorById.mockResolvedValue(vendor);
    expect(await controller.findVendorById('v1')).toEqual(vendor);
  });

  it('getCart delegates to repository with userId', async () => {
    mockRepo.findCartByUserId.mockResolvedValue([]);
    const mockReq = { user: { userId: 'u1' } };
    expect(await controller.getCart(mockReq as any)).toEqual([]);
    expect(mockRepo.findCartByUserId).toHaveBeenCalledWith('u1');
  });
});
```

- [ ] **Step 8.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=commerce.controller.spec
```
Expected: FAIL — `CommerceController` not found.

- [ ] **Step 8.3: Create commerce.controller.ts**

Create `backend-main/src/commerce/commerce.controller.ts`:

```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { CommerceRepository, NewVendor, NewProduct, NewCartItem, NewTransaction } from '../persistence';
import { Request } from 'express';

@Controller('/api/commerce')
export class CommerceController {
  constructor(private readonly commerce: CommerceRepository) {}

  @Get('vendors/:id')
  @Auth()
  findVendorById(@Param('id') id: string) {
    return this.commerce.findVendorById(id);
  }

  @Post('vendors')
  @Auth(Role.Vendor, Role.Admin)
  createVendor(@Body() body: NewVendor) {
    return this.commerce.createVendor(body);
  }

  @Patch('vendors/:id')
  @Auth(Role.Vendor, Role.Admin)
  updateVendor(@Param('id') id: string, @Body() body: Partial<NewVendor>) {
    return this.commerce.updateVendor(id, body);
  }

  @Get('products/:id')
  @Auth()
  findProductById(@Param('id') id: string) {
    return this.commerce.findProductById(id);
  }

  @Get('products')
  @Auth()
  findProductsByVendorId(@Query('vendorId') vendorId: string) {
    return this.commerce.findProductsByVendorId(vendorId);
  }

  @Post('products')
  @Auth(Role.Vendor, Role.Admin)
  createProduct(@Body() body: NewProduct) {
    return this.commerce.createProduct(body);
  }

  @Patch('products/:id')
  @Auth(Role.Vendor, Role.Admin)
  updateProduct(@Param('id') id: string, @Body() body: Partial<NewProduct>) {
    return this.commerce.updateProduct(id, body);
  }

  @Delete('products/:id')
  @Auth(Role.Vendor, Role.Admin)
  deleteProduct(@Param('id') id: string) {
    return this.commerce.deleteProduct(id);
  }

  @Get('cart')
  @Auth(Role.User)
  getCart(@Req() req: Request) {
    const userId = (req as any).user.userId as string;
    return this.commerce.findCartByUserId(userId);
  }

  @Post('cart')
  @Auth(Role.User)
  addToCart(@Req() req: Request, @Body() body: Omit<NewCartItem, 'user_id'>) {
    const userId = (req as any).user.userId as string;
    return this.commerce.addToCart({ ...body, user_id: userId });
  }

  @Patch('cart/:id')
  @Auth(Role.User)
  updateCartItem(@Param('id') id: string, @Body() body: Partial<NewCartItem>) {
    return this.commerce.updateCartItem(id, body);
  }

  @Delete('cart/:id')
  @Auth(Role.User)
  removeFromCart(@Param('id') id: string) {
    return this.commerce.removeFromCart(id);
  }

  @Post('transactions')
  @Auth(Role.Admin)
  createTransaction(@Body() body: NewTransaction) {
    return this.commerce.createTransaction(body);
  }

  @Get('transactions/:id')
  @Auth(Role.Admin)
  findTransactionById(@Param('id') id: string) {
    return this.commerce.findTransactionById(id);
  }
}
```

- [ ] **Step 8.4: Create commerce.module.ts**

Create `backend-main/src/commerce/commerce.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { CommerceController } from './commerce.controller';

@Module({
  controllers: [CommerceController],
})
export class CommerceModule {}
```

- [ ] **Step 8.5: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=commerce.controller.spec
```
Expected: PASS — 2 tests pass.

- [ ] **Step 8.6: Commit**

```bash
git add backend-main/src/commerce/
git commit -m "feat(backend): add CommerceController with vendors/products/cart/transactions endpoints

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 9: Messaging module + controller

**Files:**
- Create: `backend-main/src/messaging/messaging.module.ts`
- Create: `backend-main/src/messaging/messaging.controller.ts`
- Create: `backend-main/src/messaging/messaging.controller.spec.ts`

- [ ] **Step 9.1: Write failing test**

Create `backend-main/src/messaging/messaging.controller.spec.ts`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MessagingController } from './messaging.controller';
import { MessagingRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo: jest.Mocked<MessagingRepository> = {
  findMessageById: jest.fn(),
  findConversation: jest.fn(),
  findByReceiverId: jest.fn(),
  sendMessage: jest.fn(),
  markAsRead: jest.fn(),
  deleteMessage: jest.fn(),
} as unknown as jest.Mocked<MessagingRepository>;

describe('MessagingController', () => {
  let controller: MessagingController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagingController],
      providers: [{ provide: MessagingRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<MessagingController>(MessagingController);
  });

  it('getInbox delegates to repository with receiverId from JWT', async () => {
    mockRepo.findByReceiverId.mockResolvedValue([]);
    const mockReq = { user: { userId: 'u1' } };
    expect(await controller.getInbox(mockReq as any)).toEqual([]);
    expect(mockRepo.findByReceiverId).toHaveBeenCalledWith('u1');
  });

  it('getConversation delegates to repository', async () => {
    mockRepo.findConversation.mockResolvedValue([]);
    const mockReq = { user: { userId: 'u1' } };
    expect(await controller.getConversation(mockReq as any, 'u2')).toEqual([]);
    expect(mockRepo.findConversation).toHaveBeenCalledWith('u1', 'u2');
  });
});
```

- [ ] **Step 9.2: Run test to see it fail**

```bash
cd backend-main && npm test -- --testPathPattern=messaging.controller.spec
```
Expected: FAIL — `MessagingController` not found.

- [ ] **Step 9.3: Create messaging.controller.ts**

Create `backend-main/src/messaging/messaging.controller.ts`:

```typescript
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { MessagingRepository, NewMessage } from '../persistence';
import { Request } from 'express';

@Controller('/api/messaging')
export class MessagingController {
  constructor(private readonly messaging: MessagingRepository) {}

  @Get('messages/inbox')
  @Auth()
  getInbox(@Req() req: Request) {
    const userId = (req as any).user.userId as string;
    return this.messaging.findByReceiverId(userId);
  }

  @Get('messages/conversation')
  @Auth()
  getConversation(@Req() req: Request, @Query('with') otherId: string) {
    const userId = (req as any).user.userId as string;
    return this.messaging.findConversation(userId, otherId);
  }

  @Post('messages')
  @Auth()
  sendMessage(@Req() req: Request, @Body() body: Omit<NewMessage, 'sender_id'>) {
    const userId = (req as any).user.userId as string;
    return this.messaging.sendMessage({ ...body, sender_id: userId });
  }

  @Patch('messages/:id/read')
  @Auth()
  markAsRead(@Param('id') id: string) {
    return this.messaging.markAsRead(id);
  }

  @Delete('messages/:id')
  @Auth(Role.Admin)
  deleteMessage(@Param('id') id: string) {
    return this.messaging.deleteMessage(id);
  }
}
```

- [ ] **Step 9.4: Create messaging.module.ts**

Create `backend-main/src/messaging/messaging.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';

@Module({
  controllers: [MessagingController],
})
export class MessagingModule {}
```

- [ ] **Step 9.5: Run test to confirm pass**

```bash
cd backend-main && npm test -- --testPathPattern=messaging.controller.spec
```
Expected: PASS — 2 tests pass.

- [ ] **Step 9.6: Commit**

```bash
git add backend-main/src/messaging/
git commit -m "feat(backend): add MessagingController with inbox/conversation/send endpoints

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 10: Register feature modules in AppModule + .env

**Files:**
- Modify: `backend-main/src/app.module.ts`

- [ ] **Step 10.1: Update app.module.ts**

Replace `backend-main/src/app.module.ts` with:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './persistence';
import { validate } from './config/env.config';
import { EducationModule } from './education/education.module';
import { TeamsModule } from './teams/teams.module';
import { CommerceModule } from './commerce/commerce.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
      validate,
    }),
    PersistenceModule,
    AuthModule,
    EducationModule,
    TeamsModule,
    CommerceModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- [ ] **Step 10.2: Build backend to confirm no errors**

```bash
cd backend-main && npm run build
```
Expected: build succeeds with output in `dist/`.

- [ ] **Step 10.3: Start backend and verify it listens on :3001**

```bash
cd backend-main && npm run start:dev &
sleep 5
curl -s http://localhost:3001 | head -5
```
Expected: NestJS responds (even if just "Hello World!" from AppController).

- [ ] **Step 10.4: Verify sign-in works with demo credentials**

```bash
curl -s -X POST http://localhost:3001/api/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"demo-liseli@liseup.org","password":"demo123"}' | python3 -m json.tool
```
Expected: JSON with `accessToken`, `refreshToken`, `user` fields including `role: 0`.

- [ ] **Step 10.5: Commit**

```bash
git add backend-main/src/app.module.ts
git commit -m "feat(backend): register Education, Teams, Commerce, Messaging modules

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 11: Frontend — install jose + environment files

**Files:**
- Modify: `liseup_web/package.json`
- Create: `liseup_web/.env.local`

- [ ] **Step 11.1: Install jose**

```bash
cd liseup_web && npm install jose
```
Expected: `jose` added to `node_modules` and `package.json` `dependencies`.

- [ ] **Step 11.2: Create .env.local**

Create `liseup_web/.env.local`:

```
# Must match backend-main/.env values exactly
JWT_ACCESS_SECRET=liseup_access_secret_dev
JWT_REFRESH_SECRET=liseup_refresh_secret_dev

# Direct URL to NestJS — used by middleware and Server Actions (server-side only)
BACKEND_INTERNAL_URL=http://localhost:3001
```

- [ ] **Step 11.3: Type-check frontend**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: no new errors from jose install.

- [ ] **Step 11.4: Commit**

```bash
git add liseup_web/package.json liseup_web/package-lock.json
git commit -m "feat(frontend): add jose dependency for JWT decode in middleware

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 12: next.config.ts API rewrite

**Files:**
- Modify: `liseup_web/next.config.ts`

- [ ] **Step 12.1: Add rewrite**

Replace `liseup_web/next.config.ts` with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 12.2: Verify rewrite works in dev**

```bash
cd liseup_web && npm run dev &
sleep 5
curl -s -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"demo-liseli@liseup.org","password":"demo123"}' | python3 -m json.tool
```
Expected: Same JSON response as calling `:3001` directly (proxied through `:3000`).

- [ ] **Step 12.3: Commit**

```bash
git add liseup_web/next.config.ts
git commit -m "feat(frontend): add /api/* rewrite to NestJS backend

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 13: middleware.ts (replaces proxy.ts)

**Files:**
- Create: `liseup_web/middleware.ts`
- Delete: `liseup_web/proxy.ts`

- [ ] **Step 13.1: Delete proxy.ts**

```bash
rm liseup_web/proxy.ts
```

- [ ] **Step 13.2: Create middleware.ts**

Create `liseup_web/middleware.ts`:

```typescript
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET ?? ""
);

const PROTECTED_PREFIXES = ["/app", "/okul", "/kurum", "/yonetim"];
const PUBLIC_PATHS = [
  "/giris",
  "/kayit",
  "/sifremi-unuttum",
  "/veli-onay",
  "/davet",
];

const PREFIX_ROLE: Record<string, number> = {
  "/app": 0,
  "/okul": 4,
  "/kurum": 2,
  "/yonetim": 3,
};

export function canAccessPrefix(userRole: number, requiredRole: number): boolean {
  if (userRole === 3) return true; // Admin can access all panels
  return userRole === requiredRole;
}

function redirectToLogin(req: NextRequest, pathname: string): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = "/giris";
  url.search = `?redirectTo=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )
  ) {
    return NextResponse.next();
  }

  const prefix = PROTECTED_PREFIXES.find(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!prefix) return NextResponse.next();

  const accessToken = req.cookies.get("liseup_at")?.value;
  const refreshToken = req.cookies.get("liseup_rt")?.value;

  if (!accessToken && !refreshToken) {
    return redirectToLogin(req, pathname);
  }

  // Try to verify the access token
  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, ACCESS_SECRET);
      const userRole = payload.role as number;
      const requiredRole = PREFIX_ROLE[prefix];
      if (!canAccessPrefix(userRole, requiredRole)) {
        return redirectToLogin(req, pathname);
      }
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-payload", JSON.stringify(payload));
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch {
      // Expired or invalid — fall through to refresh
    }
  }

  // Access token missing or expired — try refresh
  if (refreshToken) {
    try {
      const backendUrl =
        process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";
      const refreshRes = await fetch(
        `${backendUrl}/api/auth/refresh?rt=${encodeURIComponent(refreshToken)}`,
        { method: "POST" }
      );
      if (!refreshRes.ok) return redirectToLogin(req, pathname);

      const { accessToken: newAt, refreshToken: newRt, user } =
        await refreshRes.json();

      const userRole = user.role as number;
      const requiredRole = PREFIX_ROLE[prefix];
      if (!canAccessPrefix(userRole, requiredRole)) {
        return redirectToLogin(req, pathname);
      }

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-payload", JSON.stringify(user));
      const res = NextResponse.next({ request: { headers: requestHeaders } });

      res.cookies.set("liseup_at", newAt, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 900,
        path: "/",
      });
      res.cookies.set("liseup_rt", newRt, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 604800,
        path: "/",
      });
      return res;
    } catch {
      return redirectToLogin(req, pathname);
    }
  }

  return redirectToLogin(req, pathname);
}

export const config = {
  matcher: [
    "/app/:path*",
    "/okul/:path*",
    "/kurum/:path*",
    "/yonetim/:path*",
  ],
};
```

- [ ] **Step 13.3: Type-check**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 13.4: Verify middleware redirects unauthenticated request**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/app
```
Expected: `307` (redirect to /giris).

- [ ] **Step 13.5: Commit**

```bash
git add liseup_web/middleware.ts && git rm liseup_web/proxy.ts
git commit -m "feat(frontend): add JWT middleware, delete proxy.ts stub

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 14: lib/auth-actions.ts — real API calls

**Files:**
- Modify: `liseup_web/lib/auth-actions.ts`

- [ ] **Step 14.1: Replace auth-actions.ts**

Replace the entire file `liseup_web/lib/auth-actions.ts` with:

```typescript
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type DemoRole = "liseli" | "okul" | "kurum" | "yonetim";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

const ROLE_REDIRECT: Record<number, string> = {
  0: "/app",
  2: "/kurum",
  3: "/yonetim",
  4: "/okul",
};

const DEMO_CREDENTIALS: Record<DemoRole, { email: string; password: string }> = {
  liseli:   { email: "demo-liseli@liseup.org",   password: "demo123" },
  okul:     { email: "demo-okul@liseup.org",     password: "demo123" },
  kurum:    { email: "demo-kurum@liseup.org",    password: "demo123" },
  yonetim:  { email: "demo-yonetim@liseup.org",  password: "demo123" },
};

async function fetchTokens(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; user: { role: number } } | null> {
  try {
    const res = await fetch(`${BACKEND}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function setAuthCookies(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("liseup_at", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 900,
    path: "/",
  });
  cookieStore.set("liseup_rt", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 604800,
    path: "/",
  });
}

export async function signIn(formData: FormData): Promise<void> {
  const email    = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/app");

  const result = await fetchTokens(email, password);
  if (!result) {
    redirect("/giris?error=invalid");
    return;
  }

  await setAuthCookies(result.accessToken, result.refreshToken);

  // Respect redirectTo only if it starts with the user's allowed prefix
  const defaultRedirect = ROLE_REDIRECT[result.user.role] ?? "/app";
  const targetPath = redirectTo.startsWith(defaultRedirect)
    ? redirectTo
    : defaultRedirect;

  redirect(targetPath);
}

export async function quickLoginAs(role: DemoRole): Promise<void> {
  const { email, password } = DEMO_CREDENTIALS[role];
  const result = await fetchTokens(email, password);
  if (!result) {
    redirect("/giris?error=invalid");
    return;
  }
  await setAuthCookies(result.accessToken, result.refreshToken);
  redirect(ROLE_REDIRECT[result.user.role] ?? "/app");
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("liseup_at")?.value;

  if (accessToken) {
    try {
      await fetch(`${BACKEND}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
    } catch {
      // Ignore — cookies are cleared regardless
    }
  }

  cookieStore.delete("liseup_at");
  cookieStore.delete("liseup_rt");
  redirect("/");
}
```

- [ ] **Step 14.2: Type-check**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 14.3: Test sign-in via the browser**

Start both servers (`backend-main`: `npm run start:dev`, `liseup_web`: `npm run dev`).
Navigate to `http://localhost:3000/giris`. Click "Liseli olarak gir".
Expected: redirected to `/app` after sign-in.

- [ ] **Step 14.4: Commit**

```bash
git add liseup_web/lib/auth-actions.ts
git commit -m "feat(frontend): replace stub auth-actions with real JWT sign-in/sign-out

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 15: lib/session.ts + lib/session-context.tsx

**Files:**
- Modify: `liseup_web/lib/session.ts`
- Create: `liseup_web/lib/session-context.tsx`

- [ ] **Step 15.1: Replace session.ts**

Replace the entire file `liseup_web/lib/session.ts` with:

```typescript
import { headers } from "next/headers";

// ─── Shared UserPayload type (mirrors backend's UserPayload) ──────────────────

export type UserPayload = {
  userId: string;
  sessionId: string;
  userName: string;
  userEmail: string;
  role: number;
  rolePayload: Record<string, unknown>;
  devices: Array<{
    deviceId: string;
    deviceName: string;
    ipAddress: string;
    lastActivatedAt: string;
    current: boolean;
  }>;
  iat?: number;
  exp?: number;
};

export const Role = {
  User:        0,
  Mentor:      1,
  Vendor:      2,
  Admin:       3,
  SchoolAdmin: 4,
} as const;

// ─── Server-side payload reader ───────────────────────────────────────────────

export async function getPayload(): Promise<UserPayload | null> {
  try {
    const headersList = await headers();
    const raw = headersList.get("x-user-payload");
    if (!raw) return null;
    return JSON.parse(raw) as UserPayload;
  } catch {
    return null;
  }
}

// ─── Typed session interfaces ─────────────────────────────────────────────────

export interface Session {
  userId: string;
  firstName: string;
  lastInitial: string;
  age: number;
  classYear: string;
  city: string;
  schoolName: string;
  schoolVerified: boolean;
  email: string;
  avatarInitials: string;
  joinedAt: string;
}

export interface OkulSession {
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  schoolName: string;
  schoolCity: string;
  schoolType: "Devlet" | "Özel";
  partnershipStatus: "Pilot Okul" | "Partner Okul";
  partnershipSince: string;
  avatarInitials: string;
}

export type KurumTier = "Discover" | "Engage" | "Partner";

export interface KurumSession {
  userId: string;
  contactFirstName: string;
  contactLastName: string;
  contactTitle: string;
  email: string;
  companyName: string;
  industry: string;
  city: string;
  tier: KurumTier;
  tierActiveSince: string;
  avatarInitials: string;
}

export type AdminRole =
  | "Super Admin"
  | "Teknik Admin"
  | "İçerik Moderatör"
  | "Okul Success"
  | "Kurum Success"
  | "İçerik Editör"
  | "Destek"
  | "Analist";

export interface AdminSession {
  userId: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  email: string;
  avatarInitials: string;
  joinedAt: string;
}

// ─── Async server-side session getters ───────────────────────────────────────
// These are for use in async Server Components and Server Actions only.
// Client components use useSession() from lib/session-context.tsx.

function initials(email: string): string {
  return email.slice(0, 2).toUpperCase();
}

export async function getSession(): Promise<Session> {
  const p = await getPayload();
  return {
    userId:         p?.userId        ?? "",
    email:          p?.userEmail     ?? "",
    avatarInitials: p ? initials(p.userEmail) : "UK",
    firstName:      "",
    lastInitial:    "",
    age:            0,
    classYear:      "",
    city:           "",
    schoolName:     "",
    schoolVerified: false,
    joinedAt:       "",
  };
}

export async function getOkulSession(): Promise<OkulSession> {
  const p = await getPayload();
  return {
    userId:            p?.userId    ?? "",
    email:             p?.userEmail ?? "",
    avatarInitials:    p ? initials(p.userEmail) : "UK",
    firstName:         "",
    lastName:          "",
    title:             "",
    schoolName:        "",
    schoolCity:        "",
    schoolType:        "Devlet",
    partnershipStatus: "Pilot Okul",
    partnershipSince:  "",
  };
}

export async function getKurumSession(): Promise<KurumSession> {
  const p = await getPayload();
  return {
    userId:           p?.userId    ?? "",
    email:            p?.userEmail ?? "",
    avatarInitials:   p ? initials(p.userEmail) : "UK",
    contactFirstName: "",
    contactLastName:  "",
    contactTitle:     "",
    companyName:      "",
    industry:         "",
    city:             "",
    tier:             "Discover",
    tierActiveSince:  "",
  };
}

export async function getAdminSession(): Promise<AdminSession> {
  const p = await getPayload();
  return {
    userId:         p?.userId    ?? "",
    email:          p?.userEmail ?? "",
    avatarInitials: p ? initials(p.userEmail) : "UK",
    firstName:      "",
    lastName:       "",
    role:           "Super Admin",
    joinedAt:       "",
  };
}
```

- [ ] **Step 15.2: Create lib/session-context.tsx**

Create `liseup_web/lib/session-context.tsx`:

```tsx
"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UserPayload } from "./session";

const SessionContext = createContext<UserPayload | null>(null);

export function SessionProvider({
  payload,
  children,
}: {
  payload: UserPayload | null;
  children: ReactNode;
}) {
  return (
    <SessionContext.Provider value={payload}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): UserPayload | null {
  return useContext(SessionContext);
}
```

- [ ] **Step 15.3: Type-check**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: no errors. (Some callers will error because `getSession()` is now async — those are fixed in Tasks 16 and 17.)

- [ ] **Step 15.4: Commit**

```bash
git add liseup_web/lib/session.ts liseup_web/lib/session-context.tsx
git commit -m "feat(frontend): replace hardcoded sessions with JWT-decoded getters and SessionProvider

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 16: Update layouts + client components

All four panel layouts become async server components that read `x-user-payload` and wrap children in `SessionProvider`. The eight client-side shell components (sidebars, user menus) switch from synchronous getter calls to `useSession()`.

**Files:**
- Modify: `liseup_web/app/app/layout.tsx`
- Modify: `liseup_web/app/okul/layout.tsx`
- Modify: `liseup_web/app/kurum/layout.tsx`
- Modify: `liseup_web/app/yonetim/layout.tsx`
- Modify: `liseup_web/components/app/user-menu.tsx`
- Modify: `liseup_web/components/app/app-sidebar.tsx`
- Modify: `liseup_web/components/admin/admin-sidebar.tsx`
- Modify: `liseup_web/components/admin/admin-user-menu.tsx`
- Modify: `liseup_web/components/kurum/kurum-sidebar.tsx`
- Modify: `liseup_web/components/kurum/kurum-user-menu.tsx`
- Modify: `liseup_web/components/okul/okul-sidebar.tsx`
- Modify: `liseup_web/components/okul/okul-user-menu.tsx`

- [ ] **Step 16.1: Update app/app/layout.tsx**

```tsx
import { headers } from "next/headers";
import { AppShell } from "@/components/app/app-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <AppShell>{children}</AppShell>
    </SessionProvider>
  );
}
```

- [ ] **Step 16.2: Update app/okul/layout.tsx**

```tsx
import { headers } from "next/headers";
import { OkulShell } from "@/components/okul/okul-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

export default async function OkulLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <OkulShell>{children}</OkulShell>
    </SessionProvider>
  );
}
```

- [ ] **Step 16.3: Update app/kurum/layout.tsx**

```tsx
import { headers } from "next/headers";
import { KurumShell } from "@/components/kurum/kurum-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

export default async function KurumLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <KurumShell>{children}</KurumShell>
    </SessionProvider>
  );
}
```

- [ ] **Step 16.4: Update app/yonetim/layout.tsx**

```tsx
import { headers } from "next/headers";
import { AdminShell } from "@/components/admin/admin-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
```

- [ ] **Step 16.5: Update components/app/user-menu.tsx**

Open the file and make these two changes:
1. Replace `import { getSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials: payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  firstName:      "",
  lastInitial:    "",
  email:          payload?.userEmail ?? "",
};
```

- [ ] **Step 16.6: Update components/app/app-sidebar.tsx**

Open the file and make these two changes:
1. Replace `import { getSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials: payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  firstName:      "",
  email:          payload?.userEmail ?? "",
};
```

- [ ] **Step 16.7: Update components/admin/admin-sidebar.tsx**

Open the file and make these two changes:
1. Replace `import { getAdminSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getAdminSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials: payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  firstName:      "",
  lastName:       "",
  email:          payload?.userEmail ?? "",
  role:           "Super Admin" as const,
};
```

- [ ] **Step 16.8: Update components/admin/admin-user-menu.tsx**

Open the file and make these two changes:
1. Replace `import { getAdminSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getAdminSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials: payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  firstName:      "",
  lastName:       "",
  email:          payload?.userEmail ?? "",
  role:           "Super Admin" as const,
};
```

- [ ] **Step 16.9: Update components/kurum/kurum-user-menu.tsx**

Open the file and make these two changes:
1. Replace `import { getKurumSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getKurumSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials:   payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  contactFirstName: "",
  contactLastName:  "",
  contactTitle:     "",
  email:            payload?.userEmail ?? "",
  companyName:      "",
  tier:             "Discover" as const,
};
```

- [ ] **Step 16.10: Update components/kurum/kurum-sidebar.tsx**

Open the file and make these two changes:
1. Replace `import { getKurumSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getKurumSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials:   payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  contactFirstName: "",
  contactLastName:  "",
  contactTitle:     "",
  email:            payload?.userEmail ?? "",
  companyName:      "",
  industry:         "",
  city:             "",
  tier:             "Discover" as const,
};
```

- [ ] **Step 16.11: Update components/okul/okul-sidebar.tsx**

Open the file and make these two changes:
1. Replace `import { getOkulSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getOkulSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials:    payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  firstName:         "",
  lastName:          "",
  email:             payload?.userEmail ?? "",
  schoolName:        "",
  partnershipStatus: "Pilot Okul" as const,
};
```

- [ ] **Step 16.12: Update components/okul/okul-user-menu.tsx**

Open the file and make these two changes:
1. Replace `import { getOkulSession } from "@/lib/session";` with `import { useSession } from "@/lib/session-context";`
2. Replace `const session = getOkulSession();` with:

```tsx
const payload = useSession();
const session = {
  avatarInitials: payload?.userEmail?.slice(0, 2).toUpperCase() ?? "UK",
  firstName:      "",
  lastName:       "",
  email:          payload?.userEmail ?? "",
  schoolName:     "",
};
```

- [ ] **Step 16.13: Type-check**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: errors only in server page files (Tasks 17 handles those).

- [ ] **Step 16.14: Commit**

```bash
git add \
  liseup_web/app/app/layout.tsx \
  liseup_web/app/okul/layout.tsx \
  liseup_web/app/kurum/layout.tsx \
  liseup_web/app/yonetim/layout.tsx \
  liseup_web/components/app/user-menu.tsx \
  liseup_web/components/app/app-sidebar.tsx \
  liseup_web/components/admin/admin-sidebar.tsx \
  liseup_web/components/admin/admin-user-menu.tsx \
  liseup_web/components/kurum/kurum-sidebar.tsx \
  liseup_web/components/kurum/kurum-user-menu.tsx \
  liseup_web/components/okul/okul-sidebar.tsx \
  liseup_web/components/okul/okul-user-menu.tsx
git commit -m "feat(frontend): inject session via SessionProvider in layouts; update client components to useSession()

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 17: Update server pages to async + API client helpers

**Files:**
- Modify: `liseup_web/app/app/page.tsx`
- Modify: `liseup_web/app/app/profil/page.tsx`
- Modify: `liseup_web/app/app/okul-baglanti/page.tsx`
- Modify: `liseup_web/app/kurum/page.tsx`
- Modify: `liseup_web/app/kurum/profil/page.tsx`
- Modify: `liseup_web/app/kurum/abonelik/page.tsx`
- Modify: `liseup_web/app/okul/page.tsx`
- Modify: `liseup_web/app/okul/partner-ayricaliklar/page.tsx`
- Create: `liseup_web/lib/api-client.ts`
- Create: `liseup_web/lib/api/education.ts`
- Create: `liseup_web/lib/api/teams.ts`
- Create: `liseup_web/lib/api/commerce.ts`
- Create: `liseup_web/lib/api/messaging.ts`

**For each server page:** add `async` to the function signature and `await` to the session getter call.

- [ ] **Step 17.1: Update app/app/page.tsx**

In `liseup_web/app/app/page.tsx`:
1. Change `export default function DashboardPage()` → `export default async function DashboardPage()`
2. Change `const session = getSession()` → `const session = await getSession()`

- [ ] **Step 17.2: Update app/app/profil/page.tsx**

In `liseup_web/app/app/profil/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const session = getSession()` → `const session = await getSession()`

- [ ] **Step 17.3: Update app/app/okul-baglanti/page.tsx**

In `liseup_web/app/app/okul-baglanti/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const session = getSession()` → `const session = await getSession()`

- [ ] **Step 17.4: Update app/kurum/page.tsx**

In `liseup_web/app/kurum/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const session = getKurumSession()` → `const session = await getKurumSession()`

- [ ] **Step 17.5: Update app/kurum/profil/page.tsx**

In `liseup_web/app/kurum/profil/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const s = getKurumSession()` → `const s = await getKurumSession()`

- [ ] **Step 17.6: Update app/kurum/abonelik/page.tsx**

In `liseup_web/app/kurum/abonelik/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const session = getKurumSession()` → `const session = await getKurumSession()`

- [ ] **Step 17.7: Update app/okul/page.tsx**

In `liseup_web/app/okul/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const session = getOkulSession()` → `const session = await getOkulSession()`

- [ ] **Step 17.8: Update app/okul/partner-ayricaliklar/page.tsx**

In `liseup_web/app/okul/partner-ayricaliklar/page.tsx`:
1. Change `export default function` → `export default async function`
2. Change `const session = getOkulSession()` → `const session = await getOkulSession()`

- [ ] **Step 17.9: Type-check — all errors should now be resolved**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 17.10: Create lib/api-client.ts**

Create `liseup_web/lib/api-client.ts`:

```typescript
import { cookies } from "next/headers";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("liseup_at")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${BACKEND}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}
```

- [ ] **Step 17.11: Create lib/api/education.ts**

Create `liseup_web/lib/api/education.ts`:

```typescript
import { apiFetch } from "../api-client";

export type School      = { id: string; admin_id: string; name: string; city: string; type: number };
export type Student     = { user_id: string; school_id: string; grade: number; parent_email: string; lp_balance: number; consent_status: boolean; achievements: unknown; total_xp: number };
export type Mentor      = { user_id: string; university: string; expertise: number[]; bio: string };
export type Category    = { id: number; name: string };

export const educationApi = {
  getSchool:           (id: string) => apiFetch<School>(`/api/education/schools/${id}`),
  getSchoolsByCity:    (city: string) => apiFetch<School[]>(`/api/education/schools?city=${encodeURIComponent(city)}`),
  createSchool:        (body: Omit<School, "id">) => apiFetch<School>("/api/education/schools", { method: "POST", body: JSON.stringify(body) }),
  updateSchool:        (id: string, body: Partial<School>) => apiFetch<School>(`/api/education/schools/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteSchool:        (id: string) => apiFetch<boolean>(`/api/education/schools/${id}`, { method: "DELETE" }),
  getStudent:          (userId: string) => apiFetch<Student>(`/api/education/students/${userId}`),
  getStudentsBySchool: (schoolId: string) => apiFetch<Student[]>(`/api/education/students?schoolId=${encodeURIComponent(schoolId)}`),
  createStudent:       (body: Omit<Student, "lp_balance" | "consent_status" | "achievements" | "total_xp">) => apiFetch<Student>("/api/education/students", { method: "POST", body: JSON.stringify(body) }),
  updateStudent:       (userId: string, body: Partial<Student>) => apiFetch<Student>(`/api/education/students/${userId}`, { method: "PATCH", body: JSON.stringify(body) }),
  getMentor:           (userId: string) => apiFetch<Mentor>(`/api/education/mentors/${userId}`),
  getCategories:       () => apiFetch<Category[]>("/api/education/categories"),
};
```

- [ ] **Step 17.12: Create lib/api/teams.ts**

Create `liseup_web/lib/api/teams.ts`:

```typescript
import { apiFetch } from "../api-client";

export type Team       = { id: string; owner_id: string; name: string };
export type TeamMember = { user_id: string; team_id: string; role: number; status: number };
export type Project    = { id: string; team_id: string | null; mentor_id: string | null; title: string; description: string; category: number; phase: number; status: number; image_url: string | null; notes: string | null; problem: string | null; solution: string | null; value_proposition: string | null; customer_segments: string | null; competition: string | null };

export const teamsApi = {
  getTeam:          (id: string) => apiFetch<Team>(`/api/teams/teams/${id}`),
  createTeam:       (body: Omit<Team, "id">) => apiFetch<Team>("/api/teams/teams", { method: "POST", body: JSON.stringify(body) }),
  updateTeam:       (id: string, body: Partial<Team>) => apiFetch<Team>(`/api/teams/teams/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteTeam:       (id: string) => apiFetch<boolean>(`/api/teams/teams/${id}`, { method: "DELETE" }),
  getMembers:       (teamId: string) => apiFetch<TeamMember[]>(`/api/teams/teams/${teamId}/members`),
  addMember:        (teamId: string, body: Omit<TeamMember, "team_id">) => apiFetch<TeamMember>(`/api/teams/teams/${teamId}/members`, { method: "POST", body: JSON.stringify(body) }),
  updateMember:     (teamId: string, userId: string, status: number) => apiFetch<boolean>(`/api/teams/teams/${teamId}/members/${userId}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  removeMember:     (teamId: string, userId: string) => apiFetch<boolean>(`/api/teams/teams/${teamId}/members/${userId}`, { method: "DELETE" }),
  getProject:       (id: string) => apiFetch<Project>(`/api/teams/projects/${id}`),
  createProject:    (body: Omit<Project, "id" | "phase" | "status" | "image_url" | "notes" | "problem" | "solution" | "value_proposition" | "customer_segments" | "competition">) => apiFetch<Project>("/api/teams/projects", { method: "POST", body: JSON.stringify(body) }),
  updateProject:    (id: string, body: Partial<Project>) => apiFetch<Project>(`/api/teams/projects/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteProject:    (id: string) => apiFetch<boolean>(`/api/teams/projects/${id}`, { method: "DELETE" }),
};
```

- [ ] **Step 17.13: Create lib/api/commerce.ts**

Create `liseup_web/lib/api/commerce.ts`:

```typescript
import { apiFetch } from "../api-client";

export type Vendor      = { id: string; manager_id: string; name: string; logo: string | null; categories: number[] };
export type Product     = { id: string; vendor_id: string; name: string; description: string; stock_count: number | null; images: string[] };
export type CartItem    = { id: string; user_id: string; product_id: string; amount: number; note: string | null };
export type Transaction = { id: string; user_id: string; team_id: string; cart: unknown; description: string; hash: string };

export const commerceApi = {
  getVendor:         (id: string) => apiFetch<Vendor>(`/api/commerce/vendors/${id}`),
  createVendor:      (body: Omit<Vendor, "id">) => apiFetch<Vendor>("/api/commerce/vendors", { method: "POST", body: JSON.stringify(body) }),
  updateVendor:      (id: string, body: Partial<Vendor>) => apiFetch<Vendor>(`/api/commerce/vendors/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  getProduct:        (id: string) => apiFetch<Product>(`/api/commerce/products/${id}`),
  getProductsByVendor: (vendorId: string) => apiFetch<Product[]>(`/api/commerce/products?vendorId=${encodeURIComponent(vendorId)}`),
  createProduct:     (body: Omit<Product, "id" | "images">) => apiFetch<Product>("/api/commerce/products", { method: "POST", body: JSON.stringify(body) }),
  updateProduct:     (id: string, body: Partial<Product>) => apiFetch<Product>(`/api/commerce/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteProduct:     (id: string) => apiFetch<boolean>(`/api/commerce/products/${id}`, { method: "DELETE" }),
  getCart:           () => apiFetch<CartItem[]>("/api/commerce/cart"),
  addToCart:         (body: Omit<CartItem, "id" | "user_id">) => apiFetch<CartItem>("/api/commerce/cart", { method: "POST", body: JSON.stringify(body) }),
  updateCartItem:    (id: string, body: Partial<CartItem>) => apiFetch<CartItem>(`/api/commerce/cart/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  removeFromCart:    (id: string) => apiFetch<boolean>(`/api/commerce/cart/${id}`, { method: "DELETE" }),
  createTransaction: (body: Omit<Transaction, "id">) => apiFetch<Transaction>("/api/commerce/transactions", { method: "POST", body: JSON.stringify(body) }),
  getTransaction:    (id: string) => apiFetch<Transaction>(`/api/commerce/transactions/${id}`),
};
```

- [ ] **Step 17.14: Create lib/api/messaging.ts**

Create `liseup_web/lib/api/messaging.ts`:

```typescript
import { apiFetch } from "../api-client";

export type Message = { id: string; sender_id: string; receiver_id: string; content: string; is_read: boolean };

export const messagingApi = {
  getInbox:        () => apiFetch<Message[]>("/api/messaging/messages/inbox"),
  getConversation: (withUserId: string) => apiFetch<Message[]>(`/api/messaging/messages/conversation?with=${encodeURIComponent(withUserId)}`),
  sendMessage:     (body: Omit<Message, "id" | "sender_id" | "is_read">) => apiFetch<Message>("/api/messaging/messages", { method: "POST", body: JSON.stringify(body) }),
  markAsRead:      (id: string) => apiFetch<boolean>(`/api/messaging/messages/${id}/read`, { method: "PATCH" }),
  deleteMessage:   (id: string) => apiFetch<boolean>(`/api/messaging/messages/${id}`, { method: "DELETE" }),
};
```

- [ ] **Step 17.15: Final type-check**

```bash
cd liseup_web && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 17.16: End-to-end smoke test**

With both servers running:
1. Go to `http://localhost:3000/giris`
2. Click "Liseli olarak gir" → should redirect to `/app`
3. Click "Okul olarak gir" → should redirect to `/okul`
4. Click "Kurum olarak gir" → should redirect to `/kurum`
5. Click "Admin olarak gir" → should redirect to `/yonetim`
6. Navigate to `http://localhost:3000/app` without being logged in → should redirect to `/giris`
7. In DevTools, inspect cookies — `liseup_at` and `liseup_rt` must be `HttpOnly`.

- [ ] **Step 17.17: Commit**

```bash
git add \
  liseup_web/app/app/page.tsx \
  liseup_web/app/app/profil/page.tsx \
  liseup_web/app/app/okul-baglanti/page.tsx \
  liseup_web/app/kurum/page.tsx \
  liseup_web/app/kurum/profil/page.tsx \
  liseup_web/app/kurum/abonelik/page.tsx \
  liseup_web/app/okul/page.tsx \
  liseup_web/app/okul/partner-ayricaliklar/page.tsx \
  liseup_web/lib/api-client.ts \
  liseup_web/lib/api/
git commit -m "feat(frontend): async server pages, api-client, and domain API helpers

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Self-Review Checklist

Spec coverage check against `docs/superpowers/specs/2026-05-08-backend-integration-design.md`:

| Spec requirement | Task |
|---|---|
| NestJS on :3001, Next.js rewrite /api/* | Task 10, 12 |
| JWT_ACCESS_SECRET + JWT_REFRESH_SECRET in both envs | Tasks 5, 11 |
| SchoolAdmin = 4 in Role enum | Task 1 |
| Role hierarchy updated | Task 1 |
| Real signIn with DB + bcrypt | Task 4 |
| Session refresh fix (role/email from user) | Task 2 |
| AuthModule @Global, AuthGuard exported | Task 3 |
| Demo user seed | Task 5 |
| Education controller (all endpoints) | Task 6 |
| Teams controller (all endpoints) | Task 7 |
| Commerce controller (cart userId from JWT) | Task 8 |
| Messaging controller (inbox userId from JWT) | Task 9 |
| Feature modules registered in AppModule | Task 10 |
| proxy.ts deleted → middleware.ts | Task 13 |
| JWT decode in middleware with jose | Task 13 |
| Transparent token refresh in middleware | Task 13 |
| Role-gating in middleware | Task 13 |
| Real sign-in / sign-out / quickLoginAs | Task 14 |
| httpOnly cookies liseup_at + liseup_rt | Task 14 |
| session.ts async getters from x-user-payload | Task 15 |
| SessionProvider + useSession() | Task 15, 16 |
| Layouts inject payload into SessionProvider | Task 16 |
| Client components use useSession() | Task 16 |
| Server pages await session getters | Task 17 |
| lib/api-client.ts typed apiFetch | Task 17 |
| Domain API helpers (education, teams, commerce, messaging) | Task 17 |
| jose added to package.json | Task 11 |
