import { Role } from '../../entities/role';

/**
 * Privilege hierarchy for the LiseUp platform.
 *
 * Mentor and Vendor are ISOLATED from the User tier by design.
 * A Mentor is a university guide — they do NOT get implicit access to
 * student-only features (LP shop, transactions, cart).
 * A Vendor is a shop manager — they do NOT get implicit access to
 * student team/project pages.
 *
 * Admin sits above all roles and can satisfy any route requirement,
 * including SchoolAdmin routes.
 *
 *   Admin (3)       →  Admin | Mentor | Vendor | User | SchoolAdmin
 *   SchoolAdmin (4) →  SchoolAdmin only
 *   Mentor (1)      →  Mentor only
 *   Vendor (2)      →  Vendor only
 *   User   (0)      →  User only
 *
 * For routes shared across roles, use explicit OR on the decorator:
 *
 *   @Auth(Role.User)                → students only
 *   @Auth(Role.Mentor)              → mentors + admin
 *   @Auth(Role.Vendor)              → vendors + admin
 *   @Auth(Role.Admin)               → admin only
 *   @Auth(Role.Mentor, Role.User)   → mentors + students + admin  (e.g. team/project pages)
 *   @Auth(Role.Mentor, Role.Vendor) → mentors + vendors + admin   (e.g. messaging)
 *   @Auth()                         → any authenticated user
 */
export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  [Role.Admin]:       [Role.Admin, Role.Mentor, Role.Vendor, Role.User, Role.SchoolAdmin],
  [Role.SchoolAdmin]: [Role.SchoolAdmin],
  [Role.Mentor]:      [Role.Mentor],
  [Role.Vendor]:      [Role.Vendor],
  [Role.User]:        [Role.User],
};

/**
 * Returns true if a user carrying `userRole` is permitted to access
 * a route that requires `requiredRole`.
 */
export function canAccess(userRole: Role, requiredRole: Role): boolean {
  return (ROLE_HIERARCHY[userRole] ?? [userRole]).includes(requiredRole);
}

/**
 * Returns true if the user's role satisfies at least one of the required roles.
 * This is what the AuthGuard uses for @Auth(Role.A, Role.B) (OR semantics).
 */
export function satisfiesAny(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.some((required) => canAccess(userRole, required));
}
