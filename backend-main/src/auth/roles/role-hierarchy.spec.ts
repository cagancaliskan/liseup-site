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
    expect(canAccess(Role.SchoolAdmin, Role.Mentor)).toBe(false);
  });
  it('satisfiesAny returns true when any required role is satisfied', () => {
    expect(satisfiesAny(Role.Admin, [Role.SchoolAdmin, Role.Vendor])).toBe(true);
    expect(satisfiesAny(Role.SchoolAdmin, [Role.SchoolAdmin, Role.Vendor])).toBe(true);
    expect(satisfiesAny(Role.User, [Role.SchoolAdmin, Role.Vendor])).toBe(false);
  });
});
