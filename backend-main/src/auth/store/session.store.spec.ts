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
    expect(record!.userPayload.userName).toBe('test@example.com');
  });
});
