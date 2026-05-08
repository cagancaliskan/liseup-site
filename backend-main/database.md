# Database Module Analysis

Stack: **PostgreSQL** + **Drizzle ORM** + **NestJS** (`src/persistence/`)

---

## Pros

### 1. Repository Pattern with Abstract Classes
Each domain (Auth, Education, Teams, Commerce, Messaging) has an abstract repository class that defines the interface, and a separate Postgres implementation. This makes the persistence layer swappable — you can add a mock or alternative DB implementation without touching business logic.

### 2. Full Type Safety via Drizzle
Types are inferred directly from the schema (`$inferSelect`, `$inferInsert`), so type mismatches between the schema and application code are caught at compile time.

### 3. Connection Pooling
`PostgresProvider` uses `pg.Pool` with configurable `max`, `idleTimeoutMillis`, and `connectionTimeoutMillis`. All values are read from `ConfigService`, making them environment-specific.

### 4. Proper Lifecycle Management
`OnModuleDestroy` is implemented on `PostgresProvider` — the pool is cleanly drained on app shutdown, preventing connection leaks.

### 5. Transaction Support
`PersistenceFacade.transaction()` wraps Drizzle's transaction API, giving upper layers a clean way to run cross-repository operations atomically.

### 6. Domain-Organized Schema
All tables live in a single `schema.ts` grouped by domain with visual separators. This is simple and works well at the current scale.

### 7. Global NestJS Module
`@Global()` on `PersistenceModule` means the facade and repositories are available everywhere without re-importing the module in each feature module.

### 8. Facade Pattern
`PersistenceFacade` is a single injectable that exposes all repositories. Services that need multiple domains only have to inject one dependency.

### 9. Cascade Deletes on Core Relations
`sessions → users`, `students → users`, `mentors → users`, `teamMembers → users`, `teamMembers → teams`, `products → vendors`, `cartItems → users` all have `onDelete: 'cascade'`, preventing orphaned rows when a parent is deleted.

### 10. ULID Primary Keys
Using ULIDs instead of UUIDs gives time-sortable IDs that are URL-safe and avoid collisions without a sequence — useful for both ordering and distribution.

---

## Cons

### 1. Missing Timestamps on Most Tables
**Severity: High**

No `created_at` or `updated_at` on `transactions`, `messages`, `teams`, `projects`, `products`, `vendors`, `schools`, or `cartItems`. For `transactions` this is a serious audit issue. For `messages` you can't sort by actual time without implicitly relying on ULID ordering.

Only `sessions` has a time column (`expires_at`), and it is nullable (see con #5).

**Fix:** Add `created_at timestamp with time zone not null default now()` to all tables. Add `updated_at` to mutable entities (`users`, `schools`, `projects`, `products`, `vendors`).

---

### 2. Integer Enums — No DB-Level Type Safety
**Severity: Medium**

`role`, `status`, `type`, `phase`, `grade` are plain `integer` columns. The DB accepts any integer, so a typo or a wrong constant produces silently wrong data with no error.

**Fix:** Use PostgreSQL `CHECK` constraints or native `pgEnum` via Drizzle to restrict accepted values.

---

### 3. Missing Indexes on Foreign Key Columns
**Severity: Medium**

Drizzle does not automatically create indexes on foreign key columns. The following columns are used in `WHERE` clauses in every repo but have no index:

| Table | Column |
|---|---|
| `sessions` | `user_id` |
| `students` | `school_id` |
| `mentors` | `user_id` |
| `team_members` | `user_id`, `team_id` |
| `projects` | `team_id`, `mentor_id` |
| `messages` | `sender_id`, `receiver_id` |
| `products` | `vendor_id` |
| `cart_items` | `user_id` |
| `transactions` | `user_id`, `team_id` |

At small scale this is fine. Under load, sequential scans on these columns will become a bottleneck.

**Fix:** Add `.index()` calls in the schema for each FK column listed above.

---

### 4. `cart_items.product_id` Has No `onDelete` Behavior
**Severity: Medium**

`products` can be deleted while `cart_items` still reference them. The FK exists (`references(() => products.id)`) but there is no `onDelete` option, so the default DB behavior (`RESTRICT` in Postgres) will block the product delete — or worse, leave orphaned rows if the constraint is bypassed.

**Fix:** Add `onDelete: 'cascade'` (or `'set null'` with a nullable column) to `cartItems.product_id`.

---

### 5. `sessions.expires_at` Is Nullable With Unclear Semantics
**Severity: Low-Medium**

`expires_at` has no `.notNull()`. A `null` value could mean "never expires" or it could be a data entry error. The `deleteExpiredSessions` query (`lt(expires_at, now())`) silently skips null-expiry sessions, so they accumulate forever.

**Fix:** Either make `expires_at` non-nullable with a maximum TTL, or explicitly document and handle `null` as "never expires" (e.g. filter with `and(isNotNull(...), lt(...))`).

---

### 6. No Startup Connection Health Check
**Severity: Low-Medium**

`PostgresProvider` logs "initialized" immediately after creating the pool, but doesn't actually test the connection. The pool connects lazily, so a wrong `DB_HOST` or wrong credentials will only surface on the first query, not at startup.

**Fix:** Add `OnModuleInit` with a test query (`SELECT 1`) to fail fast on misconfiguration.

---

### 7. `drizzle.config.ts` Defaults to Empty Password
**Severity: Low (dev config)**

```ts
password: process.env.DB_PASSWORD ?? '',
```

This silently passes an empty string if the env var is missing. In a misconfigured environment it may connect to a DB with no password set without any warning.

**Fix:** Throw an error if `DB_PASSWORD` is not set in non-development environments, or remove the fallback.

---

### 8. Untyped JSONB Columns
**Severity: Low**

`students.achievements` and `transactions.cart` are `jsonb` columns with no runtime or compile-time schema. Their shapes are documented only in `db_schema.txt`, not enforced anywhere.

**Fix:** Define TypeScript interfaces for these shapes and use Drizzle's `.$type<T>()` helper to get typed access. Add Zod validation before inserting.

---

### 9. Dual Export of Repositories and Facade
**Severity: Low**

`PersistenceModule` exports both the `PersistenceFacade` and all individual repositories:

```ts
exports: [PersistenceFacade, ...repositoryBindings.map((b) => b.provide)]
```

This lets consumers choose between injecting the facade or individual repositories, creating inconsistency. If both patterns are used in the codebase, it becomes unclear which is canonical.

**Fix:** Pick one pattern. If the facade is the intended API, stop exporting individual repositories from the module.

---

## Summary Table

| # | Issue | Severity | Effort |
|---|---|---|---|
| 1 | Missing timestamps | High | Medium |
| 2 | Integer enums, no constraints | Medium | Medium |
| 3 | Missing FK indexes | Medium | Low |
| 4 | `cart_items.product_id` no onDelete | Medium | Low |
| 5 | Nullable `expires_at` | Low-Medium | Low |
| 6 | No startup health check | Low-Medium | Low |
| 7 | Empty password fallback | Low | Low |
| 8 | Untyped JSONB | Low | Medium |
| 9 | Dual export pattern | Low | Low |
