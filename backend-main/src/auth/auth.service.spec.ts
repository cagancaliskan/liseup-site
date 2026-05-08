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
