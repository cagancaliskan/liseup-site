/**
 * Platform roles stored as integers in users.role.
 *
 * These values are persisted to the database — DO NOT renumber them.
 *
 * Privilege hierarchy (see src/auth/roles/role-hierarchy.ts):
 *
 *   Admin      → can satisfy any route (Admin | Mentor | Vendor | User | SchoolAdmin)
 *   SchoolAdmin → SchoolAdmin routes only
 *   Mentor     → Mentor routes only  (not Student/User routes by default)
 *   Vendor     → Vendor routes only  (not Student/User routes by default)
 *   User       → User routes only
 *
 * Mentor and Vendor do NOT inherit from User. Use explicit OR on the decorator
 * for routes shared across roles:
 *   @Auth(Role.Mentor, Role.User)  → mentors + students
 *   @Auth()                        → any authenticated user
 */
export enum Role {
  User        = 0,
  Mentor      = 1,
  Vendor      = 2,
  Admin       = 3,
  SchoolAdmin = 4,
}