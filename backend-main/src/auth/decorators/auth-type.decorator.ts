import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { Role } from '../../entities/role';

export const AUTH_TYPE_KEY = 'auth_type';

/**
 * Route protection decorator.
 *
 * Pass one or more roles to restrict access (OR semantics — satisfying any one is enough).
 * The role hierarchy is applied automatically, so higher-tier roles always have access:
 *
 *   @Auth()                   → any authenticated user (token must be valid)
 *   @Auth(Role.User)          → User, Admin  (Mentor and Vendor are isolated tiers)
 *   @Auth(Role.Mentor)        → Mentor, Admin
 *   @Auth(Role.Vendor)        → Vendor, Admin
 *   @Auth(Role.Admin)         → Admin only
 *   @Auth(Role.Mentor, Role.Vendor) → Mentor OR Vendor (or Admin)
 */
export function Auth(...roles: Role[]) {
    return applyDecorators(
        SetMetadata(AUTH_TYPE_KEY, roles),
        UseGuards(AuthGuard),
    );
}

// ── Shorthand decorators ────────────────────────────────────────────────────

/** Any authenticated user (token required, no role restriction). */
export const Authenticated = () => Auth();

/** Students / base users — and any role above them. */
export const UserAuth = () => Auth(Role.User);

/** Mentors and Admins. */
export const MentorAuth = () => Auth(Role.Mentor);

/** Vendors and Admins. */
export const VendorAuth = () => Auth(Role.Vendor);

/** Admins only. */
export const AdminAuth = () => Auth(Role.Admin);