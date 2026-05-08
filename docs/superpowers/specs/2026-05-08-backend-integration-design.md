# Backend Integration Design
_Date: 2026-05-08_

## Overview

Wire the existing NestJS backend (`backend-main/`) into the Next.js 16 frontend (`liseup_web/`) using JWT cookies, a Next.js rewrite proxy, and a complete set of NestJS feature controllers. The stub auth layer (fake cookie + hardcoded sessions) is replaced with real authentication backed by PostgreSQL.

---

## 1. Architecture

```
Browser
  │
  ├─► Next.js :3000  (frontend + middleware + Server Actions)
  │     │
  │     ├─ middleware.ts        ← replaces proxy.ts
  │     ├─ lib/api-client.ts    ← typed fetch wrapper (server-side)
  │     ├─ lib/auth-actions.ts  ← real sign-in / sign-out / refresh
  │     └─ lib/session.ts       ← decode JWT → typed session objects
  │
  └─► /api/* rewrites → NestJS :3001
        │
        ├─ /api/auth            ← sign-in, refresh, logout
        ├─ /api/education       ← schools, students, mentors, categories
        ├─ /api/teams           ← teams, members, projects
        ├─ /api/commerce        ← vendors, products, cart, transactions
        └─ /api/messaging       ← messages
```

### Runtime config

- `next.config.ts` rewrites `/api/:path*` → `http://localhost:3001/api/:path*`
- No `NEXT_PUBLIC_API_URL` needed — all calls go through the rewrite
- Both services share `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
- NestJS runs on `PORT=3001`

### Environment files

`liseup_web/.env.local`:
```
JWT_ACCESS_SECRET=<shared secret>
JWT_REFRESH_SECRET=<shared secret>
```

`backend-main/.env`:
```
PORT=3001
JWT_ACCESS_SECRET=<shared secret>
JWT_REFRESH_SECRET=<shared secret>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=liseup
DB_USER=postgres
DB_PASSWORD=<password>
```

---

## 2. Auth Flow

### Sign-in

1. User submits email + password on `/giris`
2. Server Action in `lib/auth-actions.ts` calls `POST /api/auth` with `{ username, password }`
3. NestJS returns `{ user: UserPayload, accessToken, refreshToken }`
4. Server Action sets two `httpOnly` cookies:
   - `liseup_at` — access token, `maxAge: 900` (15 min), `sameSite: strict`
   - `liseup_rt` — refresh token, `maxAge: 604800` (7 days), `sameSite: strict`
5. Redirects to the role-appropriate panel

### Middleware (`middleware.ts`)

Replaces `proxy.ts`. Runs on every request matching `/app/*`, `/okul/*`, `/kurum/*`, `/yonetim/*`.

1. Read `liseup_at` cookie
2. Decode locally with `jose` (`jwtVerify` + `JWT_ACCESS_SECRET`) — no backend round-trip
3. If valid → verify role matches the path prefix (see role-gating table), set `x-user-payload` header, continue
4. If expired → call `POST /api/auth/refresh?rt=<liseup_rt>`, set new `liseup_at`/`liseup_rt` cookies on the response, update the request header with the new access token, and call `NextResponse.next()` — no redirect needed, the page renders immediately
5. If missing, invalid, or wrong role → redirect to `/giris?redirectTo=<path>`

Dev auto-seed cookie trick is removed; developers sign in with demo credentials.

### Sign-out

Server Action calls `POST /api/auth/logout` with the access token as Bearer, then deletes both cookies and redirects to `/`.

### Token refresh

Happens transparently in middleware. The client never sees a 401.

### `quickLoginAs` (demo switcher)

Calls `signIn` internally with hard-coded demo credentials rather than setting a cookie directly:

| Role | Email | Password |
|---|---|---|
| liseli | `demo-liseli@liseup.org` | `demo123` |
| okul | `demo-okul@liseup.org` | `demo123` |
| kurum | `demo-kurum@liseup.org` | `demo123` |
| yonetim | `demo-yonetim@liseup.org` | `demo123` |

---

## 3. Role Mapping

### Backend `Role` enum update

```ts
export enum Role {
  User        = 0,  // liseli (student)
  Mentor      = 1,  // mentor (university guide)
  Vendor      = 2,  // kurum (institution/company)
  Admin       = 3,  // yonetim (platform admin)
  SchoolAdmin = 4,  // okul (school admin)
}
```

`ROLE_HIERARCHY` update:
- `Admin` satisfies all 5 roles (including `SchoolAdmin`)
- `SchoolAdmin` satisfies only `SchoolAdmin` routes
- `Mentor`, `Vendor`, `User` unchanged

### Frontend panel → backend role

| Frontend panel | Path prefix | Backend `Role` |
|---|---|---|
| Student app | `/app` | `User = 0` |
| School admin | `/okul` | `SchoolAdmin = 4` |
| Institution | `/kurum` | `Vendor = 2` |
| Platform admin | `/yonetim` | `Admin = 3` |

### Middleware role-gating

| Path prefix | Required role(s) |
|---|---|
| `/app/*` | `User` |
| `/okul/*` | `SchoolAdmin` |
| `/kurum/*` | `Vendor` |
| `/yonetim/*` | `Admin` |

A user with the wrong role is redirected to `/giris` rather than their own panel (to avoid leaking which panels exist).

### Session objects (`lib/session.ts`)

The four typed interfaces (`Session`, `OkulSession`, `KurumSession`, `AdminSession`) are kept but populated from the decoded `UserPayload` in `liseup_at`. Fields not in the token (e.g. `schoolName`, `city`) are fetched from the backend on first render via the API client and passed as props.

---

## 4. Backend Scaffolding

The stub `signIn` in `auth.service.ts` (accepts `hello / 123456`) is replaced with a real DB lookup using `AuthRepository.findUserByEmail` + `bcrypt.compare`.

One NestJS controller per domain. All routes require `@Auth()` unless noted as Public.

### Education (`/api/education`)

| Method | Path | Role |
|---|---|---|
| GET | `/schools/:id` | Any auth |
| GET | `/schools?city=` | Any auth |
| POST | `/schools` | Admin |
| PATCH | `/schools/:id` | Admin, SchoolAdmin |
| DELETE | `/schools/:id` | Admin |
| GET | `/students/:userId` | Any auth |
| GET | `/students?schoolId=` | SchoolAdmin, Admin |
| POST | `/students` | Admin |
| PATCH | `/students/:userId` | Admin |
| GET | `/mentors/:userId` | Any auth |
| GET | `/categories` | Public |

### Teams (`/api/teams`)

| Method | Path | Role |
|---|---|---|
| GET | `/teams/:id` | Any auth |
| POST | `/teams` | User, Mentor |
| PATCH | `/teams/:id` | User, Mentor, Admin |
| DELETE | `/teams/:id` | Admin |
| GET | `/teams/:id/members` | Any auth |
| POST | `/teams/:id/members` | User, Mentor, Admin |
| PATCH | `/teams/:id/members/:userId` | User, Mentor, Admin |
| DELETE | `/teams/:id/members/:userId` | User, Mentor, Admin |
| GET | `/projects/:id` | Any auth |
| POST | `/projects` | User, Mentor |
| PATCH | `/projects/:id` | User, Mentor, Admin |
| DELETE | `/projects/:id` | Admin |

### Commerce (`/api/commerce`)

| Method | Path | Role |
|---|---|---|
| GET | `/vendors/:id` | Any auth |
| POST | `/vendors` | Vendor, Admin |
| PATCH | `/vendors/:id` | Vendor, Admin |
| GET | `/products/:id` | Any auth |
| GET | `/products?vendorId=` | Any auth |
| POST | `/products` | Vendor, Admin |
| PATCH | `/products/:id` | Vendor, Admin |
| DELETE | `/products/:id` | Vendor, Admin |
| GET | `/cart` | User | userId read from JWT |
| POST | `/cart` | User |
| PATCH | `/cart/:id` | User |
| DELETE | `/cart/:id` | User |
| POST | `/transactions` | Admin |
| GET | `/transactions/:id` | Admin |

### Messaging (`/api/messaging`)

| Method | Path | Role |
|---|---|---|
| GET | `/messages/conversation?with=` | Any auth |
| GET | `/messages/inbox` | Any auth | receiverId read from JWT |
| POST | `/messages` | Any auth |
| PATCH | `/messages/:id/read` | Any auth |
| DELETE | `/messages/:id` | Admin |

---

## 5. Wiring & Database

### `next.config.ts` rewrite

```ts
async rewrites() {
  return [{ source: '/api/:path*', destination: 'http://localhost:3001/api/:path*' }]
}
```

### Frontend API client (`lib/api-client.ts`)

A server-side `apiFetch(path, options)` helper that:
1. Reads `liseup_at` from cookies (`next/headers`)
2. Adds `Authorization: Bearer <token>` header
3. Throws on non-2xx with a typed error

Domain-specific helpers live in:
- `lib/api/education.ts`
- `lib/api/teams.ts`
- `lib/api/commerce.ts`
- `lib/api/messaging.ts`

### Database

`SchoolAdmin = 4` is stored as integer in `users.role` — no column-level schema change required. `db:push` syncs the schema after the role enum is updated.

### Demo user seed (`backend-main/src/seed.ts`)

Creates one user per role with `bcrypt`-hashed `demo123` password, plus one `school` row with the `SchoolAdmin` demo user as `admin_id`. Run once with `ts-node src/seed.ts` before first login.

### Files changed / created

**New dependency (frontend):**
- `jose` — JWT decode in Next.js middleware (add to `liseup_web/package.json`)

**Deleted:**
- `proxy.ts`

**Modified:**
- `next.config.ts` — add rewrites
- `lib/auth-actions.ts` — real JWT auth
- `lib/session.ts` — decode from JWT
- `backend-main/src/entities/role.ts` — add SchoolAdmin
- `backend-main/src/auth/roles/role-hierarchy.ts` — update hierarchy
- `backend-main/src/auth/auth.service.ts` — real DB sign-in
- `backend-main/src/app.module.ts` — register new modules

**Created:**
- `middleware.ts` (project root)
- `lib/api-client.ts`
- `lib/api/education.ts`
- `lib/api/teams.ts`
- `lib/api/commerce.ts`
- `lib/api/messaging.ts`
- `backend-main/src/education/education.module.ts`
- `backend-main/src/education/education.controller.ts`
- `backend-main/src/teams/teams.module.ts`
- `backend-main/src/teams/teams.controller.ts`
- `backend-main/src/commerce/commerce.module.ts`
- `backend-main/src/commerce/commerce.controller.ts`
- `backend-main/src/messaging/messaging.module.ts`
- `backend-main/src/messaging/messaging.controller.ts`
- `backend-main/src/seed.ts`
- `backend-main/.env` (from `.env.example`)
